import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Login } from './pages/Login';

// Vamos criar um componente temporário pro Dashboard só para o login ter para onde ir
function TempDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-emerald-600">Login realizado com sucesso!</h1>
      <p>O seu painel de tarefas será construído aqui.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Quando entrar na raiz, vai pro Login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<TempDashboard />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;