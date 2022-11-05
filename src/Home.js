import React, { Component } from 'react';

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

const myFuncPressKey = (event) => {
    switch(event.key) {
        case "37":      
            document.getElementById("left").click();
            break;
        case "38":      
            document.getElementById("up").click();
            break;
        case "39":      
            document.getElementById("right").click();
            break;
        case "40":      
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
            input: '',
            value: 0
        }
    }

    handleClick = () => {
        this.setState((prevValue) => {
            return {
                value: prevValue.value + 1
            };
        });        
    }
    
    handleChange = (e) => {
        this.setState({input: e.target.value});
    }

    componentDidMount() {
        window.addEventListener("keypress", myFuncPressKey);
    }

    render() {
        console.log(this.state.value);
        return (
            <div className="wrapper">
                <div id="real-top">
                    <button className="arrows" id="left" onClick={this.handleClick}></button>
                    <button className="arrows" id="up" onClick={this.handleClick}></button>
                    <button className="arrows" id="right" onClick={this.handleClick}></button>
                    <button className="arrows" id="down" onClick={this.handleClick}></button>
                </div>
                <input type="text" onChange={this.handleChange}></input>
                <div className="top-panel" id="top">
                    <div className="title-buttons">
                        <div className="title-box">
                            <h1 className="title">{this.state.input}</h1>
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
                    <CellsAct cells={arrCellsAct} />
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
            <div key={cell.id} id={cell.id} className={cell.className} style={genXY(parseInt((cell.id).match(/[0-9]+/g)))}></div>
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

const genXY = (id) => {
    const frCenter = 94;
    const incr = 98;
    const frTop = 188;
    return (id < 5) ? {'top': frTop, 'left': ('calc(50%' + ' - ' + frCenter + 'px - ' + incr + 'px + ' + ((id - 1) * incr) + 'px')}
        : (id < 9) ? {'top': (frTop + incr), 'left': ('calc(50%' + ' - ' + frCenter + 'px - ' + incr + 'px + ' + ((id - 5) * incr) + 'px')}
        : (id < 13) ? {'top': (frTop + 2 * incr), 'left': ('calc(50%' + ' - ' + frCenter + 'px - ' + incr + 'px + ' + ((id - 9) * incr) + 'px')}
        : {'top': (frTop + 3 * incr), 'left': ('calc(50%' + ' - ' + frCenter + 'px - ' + incr + 'px + ' + ((id - 13) * incr) + 'px')};
}
export default Home;