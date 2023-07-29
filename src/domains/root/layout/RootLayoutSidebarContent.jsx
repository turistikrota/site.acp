import React, { useRef } from "react";
import SimpleBar from "simplebar-react";
import { menuItems } from "./RootLayoutMenu";
import RenderIfClaimExists from "~subdomains/account/components/RenderIfClaimExists";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

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
                    <Link to="/#" className="has-arrow">
                      <i className={menuItem.icon}></i>
                      <span>{t(menuItem.title)}</span>
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
