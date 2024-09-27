import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

function AppHeader() {
  return (
    <>
      <header className={styles.appHeader}>
        <div className={styles.navigationPanel}>
          <div className={styles.navigationPanelLeft}>
            <div className={styles.navigationPanelIconText}>
              <div className={styles.navigationPanelIcon}>
                <BurgerIcon type="primary" />
              </div>
              <p className="text text_type_main-default p-1">Конструктор</p>
            </div>
            <div className={styles.navigationPanelIconText}>
              <div className={styles.navigationPanelIcon}>
                <ListIcon type="secondary" />
              </div>
              <p className="text text_type_main-default text_color_inactive p-1">
                Лента заказов
              </p>
            </div>
          </div>
          <div className="logo">
            <Logo />
          </div>
          <div className={styles.navigationPanelIconText}>
            <div className={styles.navigationPanelIcon}>
              <ProfileIcon type="secondary" />
            </div>
            <p className="text text_type_main-default text_color_inactive p-1">
              Личный кабинет
            </p>
          </div>
        </div>
      </header>
    </>
  );
}

export default AppHeader;
