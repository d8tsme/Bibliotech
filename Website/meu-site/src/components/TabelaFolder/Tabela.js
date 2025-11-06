import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const API_BASE = "https://kelsi-scrobiculate-dina.ngrok-free.dev";

export default function Tabela({ titulo = "Lista de livros", rows }) {
    const [data, setData] = useState(rows || []);
    const [loading, setLoading] = useState(!rows);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (rows && rows.length) {
            setData(rows);
            setLoading(false);
            return;
        }

        let cancelled = false;
        setLoading(true);
        setError(null);

        fetch(API_BASE)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((json) => {
                if (cancelled) return;
                const items = Array.isArray(json) ? json : json?.books ?? [];
                setData(items);
            })
            .catch((err) => {
                if (cancelled) return;
                setError(err.message || "Erro ao carregar dados");
                setData([]);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [rows]);

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
                            borderCollapse: "collapse",
                            minWidth: 700,
                        }}
                    >
                        <thead>
                            <tr>
                                <th style={thStyle}>Foto</th>
                                <th style={thStyle}>Título</th>
                                <th style={thStyle}>Autor</th>
                                <th style={thStyle}>ISBN</th>
                                <th style={thStyle}>Ano</th>
                                <th style={thStyle}>Gênero</th>
                                <th style={thStyle}>Páginas</th>
                                <th style={thStyle}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((r, idx) => (
                                <tr key={r.isbn ?? idx} style={idx % 2 ? rowOddStyle : null}>
                                    <td style={tdStyle}>
                                        {r.foto ? (
                                            <img
                                                src={r.foto}
                                                alt={r.titulo || "capa"}
                                                style={{ width: 60, height: "auto", objectFit: "cover" }}
                                            />
                                        ) : (
                                            <div style={{ width: 60, height: 80, background: "#eee" }} />
                                        )}
                                    </td>
                                    <td style={tdStyle}>{r.titulo ?? "-"}</td>
                                    <td style={tdStyle}>{r.autor ?? "-"}</td>
                                    <td style={tdStyle}>{r.isbn ?? "-"}</td>
                                    <td style={tdStyle}>{r.anoPublicacao ?? "-"}</td>
                                    <td style={tdStyle}>{r.genero ?? "-"}</td>
                                    <td style={tdStyle}>{r.paginas ?? "-"}</td>
                                    <td style={tdStyle}>{r.status ?? "-"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

// estilos simples reutilizáveis
const thStyle = {
    textAlign: "left",
    padding: "8px 10px",
    borderBottom: "2px solid #ddd",
    background: "#fafafa",
    fontWeight: 600,
    fontSize: 14,
};

const tdStyle = {
    padding: "8px 10px",
    borderBottom: "1px solid #eee",
    fontSize: 14,
    verticalAlign: "middle",
};

const rowOddStyle = {
    background: "#fbfbfb",
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