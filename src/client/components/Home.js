import React from 'react';
import styles from './styles/app.css';

// Map subtypes to HTMLElements
const Elements = {
    h1: ['merfolk', 'h1', 'font-bold text-4xl'],
    h2: ['serpent', 'h2', 'font-semibold text-2xl'],
    p: ['beast', 'p', ''],
    div: ['ninja', 'div', ''],
}


const cards = [
    {
        id: 'card1',
        name: 'Banada',
        image: 'https://strategy.channelfireball.com/wp-content/uploads/2018/04/kumenatyrantoforazca.jpg',
        type: 'creature',
        subtype: Elements.h1,
        rules: [

        ],
        text: 'Hello, world!',
        power: 6,
        toughness: 9
    },
    {
        id: 'card2',
        name: 'Lorem the Wise',
        image: 'https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/f/f2/Koma_Cosmos_Serpent.jpg',
        type: 'creature',
        subtype: Elements.h2,
        rules: [
            {
                text: 'When this creature enters the battlefield, blah',
                ability: () => {
                    console.log('AAA');
                }
            }
        ],
        text: 'This is a test',
        power: 4,
        toughness: 20
    },
    {
        id: 'card3',
        name: 'Ipsum the Brave',
        image: 'https://i.pinimg.com/originals/39/e5/9b/39e59b36ca582ea3b50f13d3ce8b48f0.jpg',
        type: 'creature',
        subtype: Elements.p,
        rules: [
            {
                text: 'When this creature is the target of a spell or ability, destroy all merfolk.',

                /*
                 * Probably good to include opponent somehow so that abilities
                 * can be used on either player
                 *
                 * e.g. ability: (player, opponent) => {...}
                 */
                ability: (player) => {

                    const playerCards = player.state.cards.filter(c =>
                        c.subtype[0] !== player.state.Elements.h1[0]
                    );

                    player.setState({
                        cards: playerCards
                    });
                }
            }
        ],
        text: 'Remove my creature',
        power: 3,
        toughness: 3,
    },
];

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cards,
            Elements
        }
    }

    applyAbilities = (card) => {
        card.rules.forEach(rule => rule.ability(this));
    }

    render() {
        const player1Nodes = this.state.cards.map((c, idx) => {
            const [subtypeName, Tag, styles] = c.subtype;
            return (
                <React.Fragment key={idx}>
                    <Tag className={styles}>
                        { c.text }
                    </Tag>
                    <br />
                </React.Fragment>
            );
        });

        const player1Cards = this.state.cards.map((c) => {
            const [subtypeName, Tag, styles] = c.subtype;
            // Iterate rules
            const rules = c.rules.map((rule, i) => {
                return (
                    <React.Fragment key={i}>
                        <p>
                            {rule.text}
                        </p>
                        <br />
                    </React.Fragment>
                );
            });

            return (
                <div
                    key={c.id}
                    id={c.id}
                    className="border border-gray-500 bg-gray-200 w-1/3 h-auto p-4 m-2"
                    onClick={() => this.applyAbilities(c)}
                >
                    <p className="font-bold">{c.name}</p>
                    <img
                        src={c.image}
                        className="rounded-lg overflow-hidden h-32 w-full"
                    ></img>
                    <p>{c.type} - {subtypeName} {`<${Tag}>`}</p>
                    <br />
                    { rules }
                    <br />
                    <p className="italic">{c.text}</p>
                    <div className="flex justify-end">
                        {c.power}/{c.toughness}
                    </div>
                </div>
            );
        });

        return (
            <>
                <div className="flex flex-wrap justify-center items-center h-full w-full">
                    <div className="flex flex-grow border border-red-700 w-5/12 h-auto m-4 p-4">
                        Player 2
                    </div>
                    {/* Player 2 Site Container */}
                    <div className="flex flex-grow border border-red-700 w-5/12 h-auto m-4 p-4">
                    </div>
                    <div className="flex flex-grow justify-between border border-red-700 w-5/12 h-auto m-4 p-4">
                        { player1Cards }
                    </div>
                    {/* Player 1 Site Container */}
                    <div className="flex-grow border border-red-700 w-5/12 h-auto m-4 p-4">
                        { player1Nodes }
                    </div>
                </div>
            </>
        );
    }
}



export default Home;

