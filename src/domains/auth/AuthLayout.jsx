import NotAuthorizedView from "@/components/Kit/403";
import ServerErrorView from "@/components/Kit/500";
import ContentLoader from "@/components/Kit/ContentLoader";
import { Services, apiUrl } from "@/config/service";
import { AccountActions } from "@/domains/root/subdomains/account/store/account.store";
import { checkForbidden, checkUnauthorized } from "@/hooks/error";
import { httpClient } from "@/http/client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

export default function AuthenticationLayout({ children }) {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isServerError, setIsServerError] = useState(false);
  const [isUnauthorized, setIsUnauthorized] = useState(false);

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
              if (checkForbidden(err)) {
                setIsUnauthorized(true);
                return;
              }
              setIsServerError(true);
            });
        }
      })
      .catch((err) => {
        if (checkUnauthorized(err, i18n.language)) return;
        setIsServerError(true);
      });
  }, []);
  if (isUnauthorized) return <NotAuthorizedView />;
  if (isServerError) return <ServerErrorView />;
  if (isLoading) return <ContentLoader />;
  return <>{children}</>;
}
