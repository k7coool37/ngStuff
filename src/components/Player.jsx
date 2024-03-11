import { useState } from "react"

export default function Player({initialName, symbol, isActive, updatePlayer}){
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);
    function handleNameValueChange(eve){
        setPlayerName(eve.target.value);
    }
    function onEditClick(){
        setIsEditing((editing) => !editing); // Best practice While State updating .. instead !isEditing.. 
        if(isEditing) {
            updatePlayer(symbol,playerName);
        }

    }
    let currentPlayerName = <span className="player-name">{playerName}</span>;
    if(isEditing) currentPlayerName = <input type="text" value={playerName} onChange={handleNameValueChange} required></input>;
    return (<>
        <li className={isActive ? 'active' : undefined}>
          <span className="player">
            {currentPlayerName}
        {/* {!isEditing ?  <span className="player-name">{name}</span> : <input type="text" required></input>} */}
        <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={onEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    </>)
} 