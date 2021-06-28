import React from "react";
import imgCamion from '../../assets/img/enrutateCamion.png';
import imgPlayStore from '../../assets/img/googlePlay.png';
import imgAppleStore from '../../assets/img/appStore.png';
import './Buttons.css';

const Buttons = () => {
  // const [showSideBar, setSideBar] = useState(false);

  // const showSide = () =>
  // setSideBar(!showSideBar);

  return (
      <div className="containerButtons">
        <a href="https://www.enrutate.info/" target="_blank" rel="noreferrer" >
          <img src={imgCamion} alt="" className="camion" />
        </a>
        <a href="https://play.google.com/store/apps/details?id=com.esoftmovil.enrutate&hl=es_419" rel="noreferrer"  target="_blank">
          <img src={imgPlayStore} alt=""className="playStore" />
        </a>
        <a href="https://apps.apple.com/mx/app/enrutate/id1087679011?l=es&ls=1" rel="noreferrer" target="_blank">
          <img src={imgAppleStore} alt="" className="appleStore" />
        </a>    
      </div>
     );
  
};

export default Buttons;