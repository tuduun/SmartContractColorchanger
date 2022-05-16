const address = "0x81855562a4388B2c76A58B06884E834d67C03B06";
const abi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_element",
                "type": "string"
            }
        ],
        "name": "getColor",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_color",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_element",
                "type": "string"
            }
        ],
        "name": "setColor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

color_submit_btn.addEventListener("click", (evt) => {
    let x = document.getElementById("color_input").value;
    document.getElementById("body").style.backgroundColor = x;
    color_box.setAttribute("hidden", "true");
    resetColor.removeAttribute("hidden");
    evt.preventDefault();
});

const web3Instance = async() => {

    // if there's an Ethereum wallet present (e.g. Metamask)
  // if there's an Ethereum wallet present (e.g. Metamask)
  if (window.ethereum) {
    // Create web3 instance/connection for contract
    const web3 = new Web3(window.ethereum);
    // Get the connected wallet address
    await window.ethereum.request({method: "eth_requestAccounts"});
    const wallet = window.ethereum.selectedAddress;
    // Create connection to contract
    const statusContract = new web3.eth.Contract(abi, address);
    // "regular expression" for finding and replacing links in status updates with anchor tags
    color_submit_btn.addEventListener("click",async() => {
        getStatusPromise = statusContract.methods.getColor().call({
            from: wallet
          });
          // Get data from contract
          let color = await getStatusPromise;
          // Post as innerHTML to currentStatus element
          document.style.backgroundColor = color;
          console.log("clicked");
        return false;

    });
    restart_btn.addEventListener("click", async() => {
        // Send ETH from current wallet to address to update the status via contract
        let statusColor = document.getElementById("color_input").value
        setStatusPromise = statusContract.methods.setColor(statusColor,"body").send({
            from: wallet
        });
        statusColor = "";
        return false;
        });
        //getColor.click();
    
    }
}

web3Instance();