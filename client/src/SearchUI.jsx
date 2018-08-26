import React, { Component } from 'react';
//import assets

class SearchUI extends Component {
  render() {
    return (
      <section>
        <div className="searchui adoptitem panel panel-default ">
          <a> text response goes here </a>
          <form method="post" id="search">
            <label>
              username:
              <input name="data" type="text" />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </section>
    );
  }
}

export default SearchUI;
