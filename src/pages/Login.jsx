export default function Login() {
  return (
    <div className="page">
      <div className="login-box card">
        <div className="kicker">Hesap</div>
        <h1>Giriş Yap</h1>
        <p className="muted">Üye sistemi ve paywall bu sürümde kapalıdır.</p>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="email">E-posta</label>
          <input id="email" type="email" placeholder="ornek@posta.com" />
          <label htmlFor="pass">Şifre</label>
          <input id="pass" type="password" placeholder="••••••••" />
          <button className="btn btn-primary" type="submit" disabled>Giriş yakında</button>
        </form>
      </div>
    </div>
  );
}
