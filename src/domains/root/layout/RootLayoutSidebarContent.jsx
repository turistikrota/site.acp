import RExpantable from "@/components/Kit/RExpantable";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import SimpleBar from "simplebar-react";
import RenderIfClaimExists from "~subdomains/account/components/RenderIfClaimExists";
import { menuItems } from "./RootLayoutMenu";

export default function RootLayoutSidebarContent() {
  const ref = useRef();
  const { t } = useTranslation("menu");
  const location = useLocation()
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
                  <li className={menuItem.children.some((child) => child.to === location.pathname) ? 'has-route-active': ''}>
                    <RExpantable open={menuItem.children.some((child) => child.to === location.pathname)? true : menuItem.defaultOpen || false} icon={menuItem.icon} title={t(menuItem.title)}>
                    <ul
                      className="sub-menu"
                      aria-expanded={menuItem.defaultOpen || false}
                    >
                      {menuItem.children.map((subMenuItem, index) => (
                        <RenderIfClaimExists
                          key={subMenuItem.title + index}
                          roles={subMenuItem.roles}
                        >
                          <li>
                            <Link to={subMenuItem.to} className={subMenuItem.to === location.pathname ? 'route_active': ''}>
                              {t(subMenuItem.title)}
                            </Link>
                          </li>
                        </RenderIfClaimExists>
                      ))}
                    </ul>
                    </RExpantable>
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
                  <Link to={menuItem.to} className={menuItem.to === location.pathname ? 'route_active': ''}>
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
