import { useEffect } from "react";

export default function AuthSuccess() {
  useEffect(() => {
    // Ambil token dari URL (opsional)
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    // Kirim pesan ke window opener (halaman utama)
    if (window.opener) {
      window.opener.postMessage(
        {
          type: "OAUTH_SUCCESS",
          token,
        },
        window.location.origin
      );

      // Tutup popup
      window.close();
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1.2rem",
        fontWeight: "bold",
      }}
    >
      Logging you in...
    </div>
  );
}
