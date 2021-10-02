import React, { memo, useEffect, useState } from 'react'
import IconButton from '@material-ui/core/IconButton';
import PaletteIcon from '@material-ui/icons/PaletteOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import { COLORS, DEFAULT_COLOR } from '../config/constants';
import { makeStyles, Tooltip } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    swatchContainer: {
        width: '150px',
    },
    palleteContainer: {
        top: '-100px',
        left: '0px',
        border: '2px solid #000',
        height: '110px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5px',
        position: 'absolute',
        flexWrap: 'wrap',
        boxShadow: '0 1px 4px rgb(0 0 0 / 20%)',
        boxSizing: 'border-box',
        backgroundColor: '#fff',
    },
    colorBtn: {
        display: 'inline-block',
        textAlign: 'center',
        width: 26, height: 26,
        margin: 2, fontSize: 15,
        overflowX: 'hidden',
        overflowY: 'hidden',
        cursor: 'pointer',
        border: '2px solid transparent',
        borderRadius: '50%',
        boxSizing: 'border-box',
    }
}))

function Swatch({ swatchColor, onChangeHandler }) {
    const classes = useStyles()
    const [openPallete, setOpenPallete] = useState(false);
    const [currentColor, setCurrentColor] = useState(DEFAULT_COLOR);

    useEffect(() => {
        if (swatchColor !== currentColor) {
            setCurrentColor(swatchColor);
        }
    }, [swatchColor, currentColor]);

    function handlePalleteChange(e, color) {
        e.stopPropagation();
        setCurrentColor(color);
        if (onChangeHandler) {
            onChangeHandler(color);
        }
    }
    
    return (
        <div onMouseLeave={() => setOpenPallete(false)} style={{ position: 'relative' }}>
            <div className={classes.swatchContainer}>
                {(openPallete) && (
                    <div className={classes.palleteContainer}>
                        {COLORS.map(([name, pallete]) => {
                            const isCurrentColor = currentColor === pallete.color;
                            return (
                            <Tooltip title={name} key={name}>
                                <div
                                    key={name}
                                    className={classes.colorBtn}
                                    style={{ 
                                        backgroundColor: pallete.color,
                                        borderColor: pallete.borderColor,
                                    }}
                                    onClick={(e) => handlePalleteChange(e, pallete.color)}
                                >{isCurrentColor
                                    ? <CheckOutlinedIcon fontSize='small' />
                                    : null
                                }</div>
                            </Tooltip>
                        )})}
                    </div>
                )}
                <IconButton
                    color="inherit"
                    onMouseEnter={() => !openPallete && setOpenPallete(true)}
                >
                    <PaletteIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default memo(Swatch);
