export default function PrivacidadPage() {
  return (
    <article aria-labelledby="privacidad-title" className="mx-auto max-w-2xl">
      <h1 id="privacidad-title" className="text-3xl font-extrabold tracking-tight">
        Privacidad
      </h1>
      <p className="mt-2 text-muted">
        Esta app funciona sin cuentas y sin servidores propios. Todo lo que
        haces aquí se queda en tu dispositivo.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        <section className="rounded-2xl border border-line bg-white p-6">
          <h2 className="font-bold">Sin cuentas, sin registro</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            No necesitas crear una cuenta ni iniciar sesión. No recogemos tu
            nombre, tu correo ni ningún dato que te identifique.
          </p>
        </section>

        <section className="rounded-2xl border border-line bg-white p-6">
          <h2 className="font-bold">Nada se envía a servidores</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Tus respuestas, tus resultados y tu progreso nunca salen de tu
            dispositivo. La app no tiene backend: no hay ningún servidor
            recibiendo ni almacenando tu actividad.
          </p>
        </section>

        <section className="rounded-2xl border border-line bg-white p-6">
          <h2 className="font-bold">Tu historial vive en tu dispositivo</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            El historial de simulacros se guarda localmente en la base de datos
            IndexedDB de tu navegador. Solo tú puedes verlo y solo existe en
            este dispositivo y este navegador: si borras los datos del sitio,
            se elimina.
          </p>
        </section>

        <section className="rounded-2xl border border-line bg-white p-6">
          <h2 className="font-bold">El PDF es local y opcional</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Si generas un certificado o informe en PDF, el nombre que introduzcas
            es opcional y se usa únicamente para rellenar el documento en tu
            propio navegador. No se transmite a ningún sitio.
          </p>
        </section>

        <section className="rounded-2xl border border-line bg-white p-6">
          <h2 className="font-bold">Analítica anónima</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Usamos Vercel Analytics para obtener métricas agregadas y anónimas
            de uso (por ejemplo, páginas visitadas). No se asocian a tu
            identidad ni a tus resultados.
          </p>
        </section>
      </div>
    </article>
  )
}
