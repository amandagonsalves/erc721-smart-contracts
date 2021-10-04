// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
  uint count;

  function increment () public {
    count = count + 1;
  }

  function getCounter () public view returns (uint) {
    return count;
  }
}