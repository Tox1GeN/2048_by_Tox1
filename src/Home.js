import React, { Component } from 'react';


let count = 0;

const arrCellsBG = [
    {id: 1, className: "cell"},
    {id: 2, className: "cell"},
    {id: 3, className: "cell"},
    {id: 4, className: "cell"},
    {id: 5, className: "cell"},
    {id: 6, className: "cell"},
    {id: 7, className: "cell"},
    {id: 8, className: "cell"},
    {id: 9, className: "cell"},
    {id: 10, className: "cell"},
    {id: 11, className: "cell"},
    {id: 12, className: "cell"},
    {id: 13, className: "cell"},
    {id: 14, className: "cell"},
    {id: 15, className: "cell"},
    {id: 16, className: "cell"}
];

const arrCellsAct = [
    {id: '1act', className: "cell act"},
    {id: '2act', className: "cell act"},
    {id: '3act', className: "cell act"},
    {id: '4act', className: "cell act"},
    {id: '5act', className: "cell act"},
    {id: '6act', className: "cell act"},
    {id: '7act', className: "cell act"},
    {id: '8act', className: "cell act"},
    {id: '9act', className: "cell act"},
    {id: '10act', className: "cell act"},
    {id: '11act', className: "cell act"},
    {id: '12act', className: "cell act"},
    {id: '13act', className: "cell act"},
    {id: '14act', className: "cell act"},
    {id: '15act', className: "cell act"},
    {id: '16act', className: "cell act"}
];

/*
gameTable is an array of objects(max number of them is 16, min - 0).
Every obj contains info about one of the act cell on the table(position and value)

X coordinate access: gameTable[i].position.x
Y coordinate access: gameTable[i].position.y
Value acces: gameTable[i].value


let gameTable = [

    {
        'position': {
            'x': 0,
            'y': 0
        },
        'value': 2,
        'color': 'white',
    }

]
*/

const myFuncPressKey = (event) => {
    switch(event.key) {
        case 'ArrowLeft':      
            document.getElementById("left").click();
            break;
        case 'ArrowUp':      
            document.getElementById("up").click();
            break;
        case 'ArrowRight':      
            document.getElementById("right").click();
            break;
        case 'ArrowDown':      
            document.getElementById("down").click();
            break;
    }
}
/*
'38' up arrow
'40' down arrow
'37' left arrow
'39' right arrow
*/

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            vis1: 'hidden',
            vis2: 'hidden',
            vis3: 'hidden',
            vis4: 'hidden',
            vis5: 'hidden',
            vis6: 'hidden',
            vis7: 'hidden',
            vis8: 'hidden',
            vis9: 'hidden',
            vis10: 'hidden',
            vis11: 'hidden',
            vis12: 'hidden',
            vis13: 'hidden',
            vis14: 'hidden',
            vis15: 'hidden',
            vis16: 'hidden'
        }
    }

    handleClick = () => {
        let variable = (Object.keys(this.state)).filter( item => {
            return (/['vis']/).test(item);
        })[(Math.floor(Math.random() * (16)) + 1)];
        this.setState({[variable]: 'visible'});
        /*
        this.setState((prevValue) => {
            return {
                value: prevValue.value + 1
            };
        });        
        */
    }
    
    handleChange = (e) => {
        this.setState({input: e.target.value});
    }

    componentDidMount() {
        window.addEventListener("keydown", myFuncPressKey);
        window.addEventListener("keydown", function(e) {
            if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
                e.preventDefault();
            }
        }, false);
    }

    render() {
        count++;
        console.log('count is ', count);
        return (
            <div className="wrapper">
                <div id="real-top">
                    <button className="arrows" id="left" onClick={this.handleClick}></button>
                    <button className="arrows" id="up" onClick={this.handleClick}></button>
                    <button className="arrows" id="right" onClick={this.handleClick}></button>
                    <button className="arrows" id="down" onClick={this.handleClick}></button>
                </div>
                <div className="top-panel" id="top">
                    <div className="title-buttons">
                        <div className="title-box">
                            <h1 className="title">2048</h1>
                        </div>
                        <div className="buttons">
                            <a href="#rule-text" className="btn"><i className='far fa-question-circle'></i></a>
                            <button className="btn"><i className='fas fa-redo-alt'></i></button>
                        </div>
                    </div>
                    <div className="score-best">
                        <div className="score">
                            <div className="label">SCORE:</div>
                            <div className="value">0</div>
                        </div>
                        <div className="best">
                            <div className="label">BEST:</div>
                            <div className="value">0</div>                            
                        </div>
                    </div>
                </div>
                <div className="tbl-brd">
                    <div className="table">
                        <Cells cells={arrCellsBG} />
                    </div>
                    <CellsAct cells={arrCellsAct} styles={(Object.keys(this.state)).map(item => {
                        return this.state[item];
                    })}/>
                </div>
                <Rules />
                <hr className="divider"/>
            </div>
        )
    }
}

const Cells = (props) => {
    return props.cells.map(cell => {
        return (
            <div key={cell.id} id={cell.id} className={cell.className} style={createBgColor(cell.id)}></div>
        )
    })    
}

const CellsAct = (props) => {
    return props.cells.map(cell => {
        return (
            <div key={cell.id} id={cell.id} className={cell.className} style={genXY(parseInt((cell.id).match(/[0-9]+/g)), props.styles)}></div>
        )
    })    
}

const Rules = () => {
    return (
        <div className="rule-box">
            <div className="rule" id="rule-text">HOW TO PLAY: Use your arrow keys to move the tiles. Tiles with the same number merge into one when they touch. Add them up to reach 2048!</div>
            <a className="return" href="#real-top">Start playing →</a>            
        </div>
    )
}

const createBgColor = (colorId) => {
    return {'backgroundColor': 'rgb(50, ' + colorId * 15 + ', 130)'};
}

const genXY = (id, arrVis) => {
    const frCenter = 94;
    const incr = 98;
    const frTop = 188;
    return (id < 5) ? {'top': frTop, 'left': ('calc(50%' + ' - ' + frCenter + 'px - ' + incr + 'px + ' + ((id - 1) * incr) + 'px'), 'visibility': arrVis[id]}
        : (id < 9) ? {'top': (frTop + incr), 'left': ('calc(50%' + ' - ' + frCenter + 'px - ' + incr + 'px + ' + ((id - 5) * incr) + 'px'), 'visibility': arrVis[id]}
        : (id < 13) ? {'top': (frTop + 2 * incr), 'left': ('calc(50%' + ' - ' + frCenter + 'px - ' + incr + 'px + ' + ((id - 9) * incr) + 'px'), 'visibility': arrVis[id]}
        : {'top': (frTop + 3 * incr), 'left': ('calc(50%' + ' - ' + frCenter + 'px - ' + incr + 'px + ' + ((id - 13) * incr) + 'px'), 'visibility': arrVis[id]};
}

let arr = [1,2,3,4,5,6,7,8,9];

/*
for (let x = 0; x < 100; x++){
    console.log(Math.floor(Math.random() * (16)) + 1);
}
*/

let arr1 = [
    {
        'position': {
            'x': 0,
            'y': 0
        },
        'value': 2,
        'visibility': 'hidden',
        'color': 'white'
    },
    {
        'position': {
            'x': 1,
            'y': 1
        },
        'value': 4,
        'visibility': 'hidden',
        'color': 'yellow'
    },
    {
        'position': {
            'x': 0,
            'y': 0
        },
        'value': 2,
        'visibility': 'hidden',
        'color': 'white'
    },
    {
        'position': {
            'x': 1,
            'y': 1
        },
        'value': 4,
        'visibility': 'hidden',
        'color': 'yellow'
    },
    {
        'position': {
            'x': 0,
            'y': 0
        },
        'value': 2,
        'visibility': 'hidden',
        'color': 'white'
    },
    {
        'position': {
            'x': 1,
            'y': 1
        },
        'value': 4,
        'visibility': 'hidden',
        'color': 'yellow'
    },
    {
        'position': {
            'x': 0,
            'y': 0
        },
        'value': 2,
        'visibility': 'hidden',
        'color': 'white'
    },
    {
        'position': {
            'x': 1,
            'y': 1
        },
        'value': 4,
        'visibility': 'hidden',
        'color': 'yellow'
    },
    {
        'position': {
            'x': 0,
            'y': 0
        },
        'value': 2,
        'visibility': 'hidden',
        'color': 'white'
    },
    {
        'position': {
            'x': 1,
            'y': 1
        },
        'value': 4,
        'visibility': 'hidden',
        'color': 'yellow'
    },
    {
        'position': {
            'x': 0,
            'y': 0
        },
        'value': 2,
        'visibility': 'hidden',
        'color': 'white'
    },
    {
        'position': {
            'x': 1,
            'y': 1
        },
        'value': 4,
        'visibility': 'hidden',
        'color': 'yellow'
    },
    {
        'position': {
            'x': 0,
            'y': 0
        },
        'value': 2,
        'visibility': 'hidden',
        'color': 'white'
    },
    {
        'position': {
            'x': 1,
            'y': 1
        },
        'value': 4,
        'visibility': 'hidden',
        'color': 'yellow'
    },
    {
        'position': {
            'x': 0,
            'y': 0
        },
        'value': 2,
        'visibility': 'hidden',
        'color': 'white'
    },
    {
        'position': {
            'x': 1,
            'y': 1
        },
        'value': 4,
        'visibility': 'hidden',
        'color': 'yellow'
    },
];

//console.log('arr1', arr1[2]['visibility'])

export default Home;