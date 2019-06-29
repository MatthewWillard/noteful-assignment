import React from 'react'
import PropType from 'prop-types'

function CurrentFolder(props) {
    return(
        <p className="currentFolder">Current Folder:{props.currentFolder}</p>
    )
}

CurrentFolder.propTypes = {
    currentFolder: PropType.string,
}

CurrentFolder.defaultProps = {
    currentFolder: '',
}

export default CurrentFolder