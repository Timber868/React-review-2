import { useState } from "react";

export default function Player ({ initialName, symbol, isActive, onSave}) {
    const [name, setName] = useState(initialName);
    const [ isEditing, setIsEditing ] = useState(false)

    let playerName = <span className="player-name">{name}</span>;

    function handleEditClick () {
        //setIsEditing(!isEditing); // =>schedules a state update for next render that will show the input
        setIsEditing(isEditing => !isEditing);  //=> immediate state update

        //If we were prevously editing and button is clicked. Save the name
        if(isEditing) {
            onSave(symbol, name);
        }
    };

    function handleChange(event){
        setName(event.target.value); //Name gets updated for all changes
    };

    //Name can only change while editing has been pressed
    if (isEditing) {
        playerName = <input type="text" required value={name} onChange={handleChange}/>
    };

    return(
        <li className={isActive ? 'active' : undefined}> {/*class active added when this player is selected*/}
            <span className="player">
              {playerName} {/* Display the name that changes as well as Symbol */}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={() => handleEditClick()}>{isEditing ? "Save" : "Edit"}</button> {/*Takes care of button behaviour and output*/}
        </li>
    );
}