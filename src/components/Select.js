import React from "react"

function Select(props) { //user.noSuchProperty === undefined
    if (!(props.data) || (props.data.length <= 0)) {
       return props.showEmptySelect ? 
            <select className = {props.selectClass}
                value={' '}required>
                <option value="" disabled selected hidden>{props.placeholder}</option>
            </select> : null

    }

    return (
        <label>
            {props.label}
          <select className = {props.selectClass}
                value= {props.value && props.value != '' ? props.value : null}  
                  name = {props.name} 
                  onChange = {props.onChange} 
          >
             {(props.emptySelectValue) && (props.emptySelectValue.length>0)   ? 
             <option key = {0} value = {props.emptySelectValue} >
                {props.emptySelectValue}
            </option>
             :
             null}

            {props.data.map((item, idx) => 
                <option key = {idx+1}
                        value = {( 
                                 (props.valueName && props.valueName != '') ? 
                                  item[props.valueName] : item)
                                 }
                                
                >
                
                {((props.valueName && props.valueName != '') ? item[props.valueName] : item)}
                </option>)} 

          </select>
        </label>
    )
}

export default Select