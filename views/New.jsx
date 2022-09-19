const React = require('react')

const New = (props) => {
    return (
        <div>
            <h1> New Route </h1>

            <form action="/flights" method="POST">
                <label>Airline:</label>
                <input type="text" name="name" /><br />
                <label>flightNo:</label>
                <input type="text" number="number" /><br />
                <label>Departs:</label>
                <input type="datetime-local"></input>
                <input type="submit" value="Create Flight!" />
            </form>
        </div>
    )
}

module.exports = New;