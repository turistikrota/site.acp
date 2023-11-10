import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import RenderIfClaimExists from "~subdomains/account/components/RenderIfClaimExists";
import { menuItems } from "./RootLayoutMenu";

export default function RootLayoutSidebarContent() {
  const ref = useRef();
  const { t } = useTranslation("menu");

  return (
    <SimpleBar className="h-100" ref={ref}>
      <div id="sidebar-menu">
        <ul className="metismenu list-unstyled" id="side-menu">
          {menuItems.map((menuItem, index) => {
            if (menuItem.divider)
              return (
                <RenderIfClaimExists key={index} roles={menuItem.roles}>
                  <li className="menu-title">{t(menuItem.title)}</li>
                </RenderIfClaimExists>
              );

            if (menuItem.children) {
              return (
                <RenderIfClaimExists
                  key={menuItem.title + index}
                  roles={menuItem.roles}
                >
                  <li>
                    <Link to="/#" className="d-flex justify-content-between">
                      <div>
                        <i className={menuItem.icon}></i>
                        <span>{t(menuItem.title)}</span>
                      </div>
                      <div className="d-flex align-items-center justify-content-end">
                        <i className="bx bx-chevron-down unset-min-width menu-icon"></i>
                      </div>
                    </Link>
                    <ul
                      className="sub-menu"
                      aria-expanded={menuItem.defaultOpen ?? false}
                    >
                      {menuItem.children.map((subMenuItem, index) => (
                        <RenderIfClaimExists
                          key={subMenuItem.title + index}
                          roles={subMenuItem.roles}
                        >
                          <li>
                            <Link to={subMenuItem.to}>
                              {t(subMenuItem.title)}
                            </Link>
                          </li>
                        </RenderIfClaimExists>
                      ))}
                    </ul>
                  </li>
                </RenderIfClaimExists>
              );
            }
            return (
              <RenderIfClaimExists
                key={menuItem.title + index}
                roles={menuItem.roles}
              >
                <li>
                  <Link to={menuItem.to}>
                    <i className={menuItem.icon}></i>
                    <span>{t(menuItem.title)}</span>
                  </Link>
                </li>
              </RenderIfClaimExists>
            );
          })}
        </ul>
      </div>
    </SimpleBar>
  );
}
