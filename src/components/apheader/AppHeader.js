import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import "./appheader.css";

function AppHeader() {
  return (
    <>
      <header className="App-header">
        <div className="navigation-panel">
          <div className="navigation-panel-left">
            <div className="navigation-panel-icon-text">
              <div className="navigation-panel-icon p-1">
                <BurgerIcon type="primary" />
              </div>
              <p className="text text_type_main-default p-1">Конструктор</p>
            </div>
            <div className="navigation-panel-icon-text">
              <div className="navigation-panel-icon p-1">
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
          <div className="navigation-panel-icon-text">
            <div className="navigation-panel-icon p-1">
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
