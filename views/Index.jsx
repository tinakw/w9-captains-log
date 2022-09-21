const React = require('react')

const Index = (props) => {
    return (
        <div>
            <h1> Index Route </h1>

            <form action="/logs" method="POST">
                <label>Captains Log:</label>
                <input type="title" title="string" /><br />
                <input type="textarea" entry="string" /><br />
                <input type= "date"/><br />
                <input type="checkbox" shipisbroken="shipisbroken"></input>
                <input type="submit" />
            </form>
        </div>
    )
}

module.exports = Index;