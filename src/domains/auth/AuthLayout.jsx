import React from "react";
import { Services, apiUrl } from "@/config/service";
import { checkUnauthorized } from "@/hooks/error";
import { httpClient } from "@/http/client";
import ServerErrorView from "@/components/Kit/500";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ContentLoader from "@/components/Kit/ContentLoader";
import { useDispatch } from "react-redux";
import { AccountActions } from "@/domains/root/subdomains/account/store/account.store";

export default function AuthenticationLayout({ children }) {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isServerError, setIsServerError] = useState(false);
  useEffect(() => {
    httpClient
      .get(apiUrl(Services.Auth, "/"))
      .then((res) => {
        if (res.status === 200) {
          const authRes = res.data;
          httpClient
            .get(apiUrl(Services.Admin, "/"))
            .then((res) => {
              if (res.status === 200) {
                dispatch(AccountActions.setAccount(authRes));
                setIsLoading(false);
              }
            })
            .catch((err) => {
              if (checkUnauthorized(err, i18n.language)) return;
              setIsServerError(true);
            });
        }
      })
      .catch((err) => {
        if (checkUnauthorized(err, i18n.language)) return;
        setIsServerError(true);
      });
  }, []);
  if (isServerError) return <ServerErrorView />;
  if (isLoading) return <ContentLoader />;
  return <>{children}</>;
}
