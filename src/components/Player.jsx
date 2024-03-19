import { useState } from "react";

export default function Player ({ initialName, symbol, isActive}) {
    const [name, setName] = useState(initialName);
    const [ isEditing, setIsEditing ] = useState(false)

    let playerName = <span className="player-name">{name}</span>;

    function handleEditClick () {
        //setIsEditing(!isEditing); // =>schedules a state update for next render that will show the input
        setIsEditing(isEditing => !isEditing);  //=> immediate state update
    };

    function handleChange(event){
        setName(event.target.value);
    };

    if (isEditing) {
        playerName = <input type="text" required value={name} onChange={handleChange}/>
    };

    return(
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
              {playerName}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={() => handleEditClick()}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}