import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import apiFetch from '../../utils/apiFetch';
import PropTypes from "prop-types";

// Tabela is generic; pass `apiPath` like '/livros/listar' to fetch data
export default function Tabela({ titulo = "Lista", rows, apiPath = '/livros/listar', columns }) {
    const [data, setData] = useState(rows || []);
    const [loading, setLoading] = useState(!rows || (Array.isArray(rows) && rows.length === 0));
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // if rows passed from parent, use them and skip fetching
        if (rows && Array.isArray(rows) && rows.length > 0) {
            setData(rows);
            setLoading(false);
            return;
        }

        let cancelled = false;
        setLoading(true);
        setError(null);

        apiFetch(apiPath, { method: 'GET' })
            .then((json) => {
                if (cancelled) return;
                // support array responses or wrapped objects like { data: [...] } or { books: [...] }
                const items = Array.isArray(json) ? json : json?.data ?? json?.books ?? [];
                setData(items);
            })
            .catch((err) => {
                if (cancelled) return;
                // on auth errors navigate to login
                if (err.status === 401 || err.status === 403) {
                    navigate('/login');
                    return;
                }
                setError(err.message || "Erro ao carregar dados");
                setData([]);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [rows, navigate, apiPath]);

    return (
        <div style={{ padding: 12, fontFamily: "system-ui, sans-serif" }}>
            <h2 style={{ margin: "0 0 12px 0" }}>{titulo}</h2>

            {loading ? (
                <div>Carregando...</div>
            ) : error ? (
                <div style={{ color: "crimson" }}>Erro: {error}</div>
            ) : data.length === 0 ? (
                <div>Nenhum registro encontrado.</div>
            ) : (
                <div style={{ overflowX: "auto" }}>
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "separate",
                            borderSpacing: '0 8px',
                            minWidth: 700,
                            background: 'transparent',
                            color: '#fff'
                        }}
                    >
                        <thead>
                            <tr>
                                {(columns && columns.length > 0 ? columns : defaultColumns()).map(col => (
                                    <th key={col.key} style={thStyle}>{col.label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((r, idx) => (
                                <tr key={r.id ?? r.isbn ?? idx} style={idx % 2 ? rowOddStyle : null}>
                                    {(columns && columns.length > 0 ? columns : defaultColumns()).map(col => (
                                        <td key={col.key} style={tdStyle}>
                                            {renderCell(r, col.key)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

function renderCell(row, key) {
    const v = row[key];
    if (!v && v !== 0) return '-';
    if (key.toLowerCase().includes('foto') && typeof v === 'string') {
        return <img src={v} alt="foto" style={{ width: 60, height: 'auto', objectFit: 'cover' }} />;
    }
    return String(v);
}

function defaultColumns() {
    return [
        { key: 'foto', label: 'Foto' },
        { key: 'titulo', label: 'Título' },
        { key: 'autorNome', label: 'Autor' },
        { key: 'generoNome', label: 'Gênero' },
        { key: 'isbn', label: 'ISBN' },
        { key: 'paginas', label: 'Páginas' },
        { key: 'anoPublicacao', label: 'Ano' },
        { key: 'status', label: 'Status' },
    ];
}

// estilos simples reutilizáveis
const thStyle = {
    textAlign: "center",
    padding: "10px 12px",
    borderBottom: "3px solid rgba(255,255,255,0.25)",
    background: "transparent",
    color: '#fff',
    fontWeight: 800,
    fontSize: 14,
};

const tdStyle = {
    padding: "10px 12px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    fontSize: 14,
    verticalAlign: "middle",
    color: '#fff',
    textAlign: 'center',
};

const rowOddStyle = {
    background: 'transparent',
};

Tabela.propTypes = {
    titulo: PropTypes.string,
    rows: PropTypes.arrayOf(
        PropTypes.shape({
            titulo: PropTypes.string,
            isbn: PropTypes.string,
            anoPublicacao: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            autor: PropTypes.string,
            genero: PropTypes.string,
            foto: PropTypes.string,
            paginas: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            status: PropTypes.string,
        })
    ),
};