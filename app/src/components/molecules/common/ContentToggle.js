import React, {useState} from 'react'

export default (toggle, content) => {
    const [showContent, updateShowContent] = useState(true)
    const toggleComponent = 
    <span style={{hover: "pointer"}} onClick={() => updateShowContent(true)}>
        {toggle}
    </span>
    const contentComponent = content(() => updateShowContent(false))
    return showContent  ? contentComponent : toggleComponent;
}