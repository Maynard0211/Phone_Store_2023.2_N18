import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import s from "./Sidebar.module.scss";
import LinksGroup from "./LinksGroup/LinksGroup.jsx";
import { changeActiveSidebarItem } from "../../actions/navigation.js";
//import SofiaLogo from "../Icons/SofiaLogo.jsx";
import cn from "classnames";

const Sidebar = (props) => {
  const { activeItem = "", ...restProps } = props;

  const [burgerSidebarOpen, setBurgerSidebarOpen] = useState(false);

  useEffect(() => {
    if (props.sidebarOpened) {
      setBurgerSidebarOpen(true);
    } else {
      setTimeout(() => {
        setBurgerSidebarOpen(false);
      }, 0);
    }
  }, [props.sidebarOpened]);

  return (
    <nav className={cn(s.root, { [s.sidebarOpen]: burgerSidebarOpen })}>
      <header className={s.logo}>
        <span className={s.title}>PHONE STORE</span>
      </header>
      <ul className={s.nav}>
        <LinksGroup
          onActiveSidebarItemChange={(activeItem) =>
            props.dispatch(changeActiveSidebarItem(activeItem))
          }
          activeItem={props.activeItem}
          header="Trang chủ"
          isHeader
          iconName={<i className={"eva eva-home-outline"} />}
          link="/template/dashboard"
          index="dashboard"
          // badge="9"
        />
        <h5 className={s.navTitle}>Menu</h5>
        <LinksGroup
          onActiveSidebarItemChange={(activeItem) =>
            props.dispatch(changeActiveSidebarItem(activeItem))
          }
          activeItem={props.activeItem}
          header="Tất Cả Điện thoại "
          isHeader
          iconName={<i className={"eva eva-grid-outline"} />}
          link="/template/products"
          index="typography"
        />

        <LinksGroup
          onActiveSidebarItemChange={(activeItem) =>
            props.dispatch(changeActiveSidebarItem(activeItem))
          }
          activeItem={props.activeItem}
          header="Thêm Điện thoại "
          isHeader
          iconName={<i className={"eva eva-book-outline"} />}
          link="/template/insertProduct"
          index="typography"
        />

        <LinksGroup
          onActiveSidebarItemChange={(activeItem) =>
            props.dispatch(changeActiveSidebarItem(activeItem))
          }
          activeItem={props.activeItem}
          header="Bán điện thoại"
          isHeader
          iconName={<i className={"eva eva-cube-outline"} />}
          link="/template/uielements"
          index="uielements"
          childrenLinks={[
            {
              header: "Tạo hoá đơn bán",
              link: "/template/createPhoneSale",
            },
            {
              header: "Xem hoá đơn bán",
              link: "/template/viewsPhoneSale",
            },
          ]}
        />

        <LinksGroup
          onActiveSidebarItemChange={(activeItem) =>
            props.dispatch(changeActiveSidebarItem(activeItem))
          }
          activeItem={props.activeItem}
          header="Nhập điện thoại"
          isHeader
          iconName={<i className={"eva eva-book-outline"} />}
          link="/template/uielements"
          index="uielements"
          childrenLinks={[
            {
              header: "Tạo H.Đ nhập",
              link: "/template/createEnterPhone",
            },
            {
              header: "Xem hoá đơn nhập",
              link: "/template/viewsEnterPhone",
            },
          ]}
        />

        <LinksGroup
          onActiveSidebarItemChange={(activeItem) =>
            props.dispatch(changeActiveSidebarItem(activeItem))
          }
          activeItem={props.activeItem}
          header="Thống kê doanh số"
          isHeader
          iconName={<i className={"eva eva-cube-outline"} />}
          link="/template/chart"
          index="typography"
        />
      </ul>
    </nav>
  );
};

Sidebar.propTypes = {
  sidebarOpened: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  activeItem: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    activeItem: store.navigation.activeItem,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
