import React, { Component } from 'react';
//import assets

class AdoptFilter extends Component {
  render() {
    return (
      <section>
        <div className="panel panel-default">
          <p>Filter</p>
          <select>
            <option value="persian">Persian</option>
            <option value="tabby">Tabby</option>
            <option value="fluffles">Fluffles</option>
            <option value="audi" selected>
              Select
            </option>
          </select>

          <select>
            <option value="persian">Persian</option>
            <option value="tabby">Tabby</option>
            <option value="fluffles">Fluffles</option>
            <option value="audi" selected>
              Select
            </option>
          </select>

          <select>
            <option value="persian">Persian</option>
            <option value="tabby">Tabby</option>
            <option value="fluffles">Fluffles</option>
            <option value="audi" selected>
              Select
            </option>
          </select>
        </div>
      </section>
    );
  }
}

export default AdoptFilter;
