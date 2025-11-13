import './Login.css';
import Form from '../../components/Formfolder/Form';
import LogoPeople from './logo-people.svg';

export default function Login() {
  return (
    <div className="login-page">
    <div className="login-card fade-in">
        <div className="card-header">
          <img src={LogoPeople} alt="logo" className="brand-icon" />
          <h1 className="brand-title">Bibliotech™</h1>
          <p className="brand-sub">Use sua conta para entrar.</p>
        </div>

        <div className="card-body">
          <Form />
        </div>
      </div>
    </div>
  );
}