import { useEffect } from "react";

export default function useFbGuard(redirectUrl = "https://google.com") {
  useEffect(() => {
    const allowedReferrers = [
      "facebook.com",
      "m.facebook.com",
      "l.facebook.com",
      "lm.facebook.com",
    ];

    const referrer = document.referrer;
    const isMobile = /iPhone|Android|Mobile|iPad/i.test(navigator.userAgent);

    const isFromFacebook = allowedReferrers.some((domain) =>
      referrer.includes(domain)
    );

    if (!isFromFacebook || !isMobile || referrer === "") {
      window.location.replace(redirectUrl);
    }
  }, [redirectUrl]);
}
