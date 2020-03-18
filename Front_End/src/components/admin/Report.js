import React, { Component } from 'react'
import axios from 'axios';
import { Doughnut,Line,Bar } from 'react-chartjs-2';
import { APIURL } from '../../supports/APiUrl';
export class Report extends Component {
  constructor(props) {
    super(props);
    this.state = { Data: {} };
  }


  componentDidMount() {

    // this.renderTotalItem()
    


      axios.get(`${APIURL}/productlist/getdatapenjualan`)
      .then((res) => {
        console.log(res);
        const test = res.data
        let total = []
        let waktu = []
        test.forEach(record => {
          total.push(record.total)
          waktu.push(record.waktu)
        })
        this.setState({
          Data1: {
            labels: waktu,
            datasets: [
              {
                label: 'Penjualan',
                data: total,
                backgroundColor: [
                  "#3cb371",
                  "#0000FF",
                  "#9966FF",
                  "#4C4CFF",
                  "#00FFFF",
                  "#f990a7",
                  "#aad2ed",
                  "#FF00FF",
                  "Blue",
                  "Red"
                ]
              }
            ]
          }

        });
        console.log(this.state.categoryname[0].nama)
      }).catch((err) => {
        console.log(err);
      })

      axios.get(`${APIURL}/productlist/getdatacart`)
      .then((res) => {
        console.log(res);
        const test = res.data
        let total = []
        let nama = []
        test.forEach(record => {
          total.push(record.total)
          nama.push(record.nama)
        })
        this.setState({
          Data: {
            labels: nama,
            datasets: [
              {
                label: 'Total Jual',
                data: total,
                backgroundColor: [
                  "#3cb371",
                  "#0000FF",
                  "#9966FF",
                  "#4C4CFF",
                  "#00FFFF",
                  "#f990a7",
                  "#aad2ed",
                  "#FF00FF",
                  "Blue",
                  "Red"
                ]
              }
            ]
          }

        });
        console.log(this.state.categoryname[0].nama)
      }).catch((err) => {
        console.log(err);
      })

  }

  // renderTotalItem =()=>{
  //   axios.get('${APIURL}/productlist/getdatacart')
  //     .then((res) => {
  //       console.log(res);
  //       const test = res.data
  //       let total = []
  //       let nama = []
  //       test.forEach(record => {
  //         total.push(record.total)
  //         nama.push(record.nama)
  //       })
  //       this.setState({
  //         Data: {
  //           labels: nama,
  //           datasets: [
  //             {
  //               label: 'TESTIS',
  //               data: total,
  //               backgroundColor: [
  //                 "#3cb371",
  //                 "#0000FF",
  //                 "#9966FF",
  //                 "#4C4CFF",
  //                 "#00FFFF",
  //                 "#f990a7",
  //                 "#aad2ed",
  //                 "#FF00FF",
  //                 "Blue",
  //                 "Red"
  //               ]
  //             }
  //           ]
  //         }

  //       });
  //       console.log(this.state.categoryname[0].nama)
  //     }).catch((err) => {
  //       console.log(err);
  //     })
  // }

  // renderTotalItem=()=>{
  //   <div>
  //   <Doughnut
  //         data={this.state.Data}
  //         width={5}
  //         height={5}
  //         options={{ maintainAspectRatio: true }} />
  //         <Line
  //         data={this.state.Data}
  //         options={{ maintainAspectRatio: true }} />
  //         </div>
  // }
 
  render() {
    return (
      <div style={{width: '500px', height:'300px'}}>
        <div style={{width: '300px', height:'300px'}}>
        <Doughnut
          data={this.state.Data}
          width={5}
          height={5}
          options={{ maintainAspectRatio: true }} />
        </div>
        <div style={{width: '500px', height:'300px', marginTop: '150px'}}>
        <Bar
          data={this.state.Data1}
          options={{ maintainAspectRatio: true }} />
        </div>
        
          
          
      </div>
      
    );
  }
}

export default Report