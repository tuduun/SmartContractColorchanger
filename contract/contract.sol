
pragma solidity ^0.8.1;

contract colorKOTH {

    mapping(string => string) private color;

    // Using mappings to store associative array data (think: dict)
    function setColor(string memory _color, string memory _element) public  {
        color[_element] = _color;
    }

    function getColor(string memory _element) public view returns (string memory) {
        return color[_element];
    }

}