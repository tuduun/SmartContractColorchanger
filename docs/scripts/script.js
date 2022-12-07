const address = "0x1fb88eD66146bBc7dDC24B9c18e3CD8eBC9b8558"; 
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


var theInput = document.getElementById("color_input");

theInput.addEventListener("input", function(){
  var x = theInput.value;
  document.getElementById("body").style.backgroundColor = x;
  resetColor.removeAttribute("hidden");
  get_status_btn.removeAttribute("hidden");
  
}, false);

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
    const pageColor = async() => {
        getStatusPromise = statusContract.methods.getColor("body").call({
            from: wallet
          });
          // Get data from contract
          let color = await getStatusPromise;
          // Post as innerHTML to currentStatus element
          document.getElementById("body").style.backgroundColor = color;
          console.log("clicked");
        return false;

    };
    // Get the status everytime the page reloads or starts 
    pageColor();
    get_status_btn.addEventListener("click", async() => {
        pageColor();
        document.getElementById("resetColor").hidden = true;
        document.getElementById("get_status_btn").hidden = true;

    })

    set_status_btn.addEventListener("click", async() => {
        // Send ETH from current wallet to address to update the status via contract
        let statusColor = document.getElementById("color_input").value
        setStatusPromise = statusContract.methods.setColor(statusColor,"body").send({
            from: wallet
        });
        statusColor = "";
        return false;
        });
    }
}

web3Instance();
