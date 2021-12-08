<template>
  <div class="app-container">
    <div id="map" ref="map" />
    <el-card id="details" class="box-card">
      <div slot="header" class="clearfix custom-box-card-header">
        <span style="font-size: large">{{ detailsTitle }}</span>
        <div style="float: right">
          <el-button
            size="medium"
            :type="switchDetailType"
            :icon="switchDetailIcon"
            circle
            @click="switchDetailMode"
          />
        </div>
      </div>
      <div id="history">
        <ul v-if="isShowPatientDetail" class="patient-details-list">
          <li
            v-for="(details, index) in patientDetails"
            :key="index"
          >
            {{ details }}
          </li>
        </ul>
        <BarChart
          v-else-if="!isShowPatientDetail && days.length > 0"
          :x-axis-data="days.map(day => {return day.slice(0, 5)})"
          :page-a-data="inIsolation"
          :page-b-data="inCommunity"
          :page-a-name="`Trong khu cách ly`"
          :page-b-name="`Ngoài cộng đồng`"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { init } from '@/utils/gmaps'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import { fetchData } from '@/api/medicalrecord'
import { convertToYYYYMMDDFormat } from '@/utils/dateUtils'
import BarChart from '@/views/map/components/BarChart'

const ICON = {
  COVID_PATIENT_POSITIVE: 'http://maps.google.com/mapfiles/kml/pal3/icon38.png',
  COVID_PATIENT_NEGATIVE: null,
  MY_LOCATION: null
}
export default {
  name: 'App',
  components: { BarChart },
  data() {
    return {
      map: null,
      infoWindow: null,
      mapCenter: null,
      myLocation: null,
      zoom: 7,
      markersPosition: [],
      covidPatients: [],
      markers: [],
      patientDetailsRaw: '',
      days: [],
      inIsolation: [],
      inCommunity: [],
      detailsTitle: 'Biểu đồ ca bệnh',
      switchDetailType: 'primary',
      switchDetailIcon: 'el-icon-s-order',
      isShowPatientDetail: false
    }
  },
  computed: {
    patientDetails() {
      return this.patientDetailsRaw.split('\n')
    }
  },
  created() {
    this.$getLocation()
      .then(coordinates => {
        this.myLocation = coordinates
        this.mapCenter = coordinates
        // this.mapCenter = {
        //   lat: 21.019666377307708, lng: 105.8449702201873
        // }
        // this.markersPosition.push(coordinates)
      })
  },
  mounted() {
    this.initMap().catch(err => {
      console.log(err)
      this.$message.error('Lỗi khởi tạo Bản đồ !')
    })
  },
  methods: {
    async initMap() {
      try {
        const google = await init()
        this.map = new google.maps.Map(this.$refs['map'], {
          center: this.mapCenter,
          zoom: this.zoom
        })
        this.getCovidPatients()
        this.addEventHandler()
        this.addMarkers()
        console.log('init map done')
      } catch (error) {
        console.error(error)
        this.$message.error('Lỗi khởi tạo Bản đồ !')
      }
    },
    addEventHandler() {
      this.map.addListener('click', function(event) {
        console.log('lat= ' + event.latLng.lat() + ', lng= ' + event.latLng.lng())
      })
    },
    addMarkers() {
      this.createInfoWindow()
      this.addMyLocationMarker()
    },
    addPatientsMarker() {
      for (const patient of this.covidPatients) {
        this.markers.push(this.createMarker({ ...patient, icon: ICON.COVID_PATIENT_POSITIVE, content: patient }))
      }
      const map = this.map
      const markers = this.markers
      new MarkerClusterer({ map, markers })
    },
    addMyLocationMarker() {
      this.createMarker({ ...this.myLocation })
    },
    createInfoWindow() {
      this.infoWindow = new google.maps.InfoWindow({
        content: '',
        disableAutoPan: true
      })
      this.infoWindow.addListener('closeclick', () => {
        this.hidePatientDetail()
      })
    },
    createMarker(props) {
      const marker = new google.maps.Marker({
        position: props.position,
        map: this.map
      })
      if (props.icon) {
        marker.setIcon(props.icon)
      }
      if (props.content) {
        marker.addListener('click', () => {
          this.patientDetailsRaw = props.content.details
          this.infoWindow.setContent(getHtmlForm(props.content))
          this.infoWindow.open(this.map, marker)
          this.centeringMapTo(props.position)
        })
      }
      return marker
    },
    centeringMapTo(coordinate) {
      this.map.panTo(coordinate)
      this.mapCenter = coordinate
    },
    switchDetailMode() {
      this.isShowPatientDetail = !this.isShowPatientDetail

      if (this.isShowPatientDetail) {
        this.detailsTitle = 'Thông tin dịch tễ'
        this.switchDetailType = 'success'
        this.switchDetailIcon = 'el-icon-s-marketing'
      } else {
        this.detailsTitle = 'Biểu đồ ca bệnh'
        this.switchDetailType = 'primary'
        this.switchDetailIcon = 'el-icon-s-order'
      }
    },
    hidePatientDetail() {
      this.patientDetailsRaw = ''
    },
    getCovidPatients() {
      fetchData()
        .then(response => {
          const data = response.data
          const patients = data.reduce((obj, curObj) => {
            const date = curObj.confirmedDate
            if (obj[date] == null) {
              obj[date] = {}
              obj[date]['patients'] = []
              obj[date]['inIsolation'] = 0
              obj[date]['inCommunity'] = 0
            }
            obj[date]['patients'].push(curObj)
            const type = curObj.type
            if (type.toLowerCase().indexOf('Cộng đồng'.toLowerCase()) >= 0) {
              obj[date]['inCommunity']++
            } else {
              obj[date]['inIsolation']++
            }
            return obj
          }, {})
          this.covidPatients = data.map((patient, index) => {
            return {
              position: fakePos[index],
              ...patient
            }
          })
          console.log(Object.keys(patients))
          this.days = Object.keys(patients).sort((a, b) => {
            return new Date(new Date(convertToYYYYMMDDFormat(a)) - new Date(convertToYYYYMMDDFormat(b)))
          })
          for (const day of this.days) {
            this.inIsolation.push(patients[day]['inIsolation'])
            this.inCommunity.push(patients[day]['inCommunity'])
          }
          console.log(this.covidPatients)
          console.log(this.days)
          this.addPatientsMarker()
        })
        .catch(err => {
          console.log(err)
          this.$message.error('Lỗi tải dữ liệu xuống !')
        })
    }
  }
}
const getHtmlForm = function(content) {
  const template = `
      <div style="font-size: small">
        <h3>Bệnh nhân ${content.id}</h3>
        <ul>
          <li style="margin-bottom: 5px">Họ tên: ${content.name}</li>
          <li style="margin-bottom: 5px">Giới tính: ${content.gender}</li>
          <li style="margin-bottom: 5px">Ngày sinh: ${content.dob}</li>
          <li style="margin-bottom: 5px">Địa chỉ: ${content.address}</li>
          <li style="margin-bottom: 5px">Ngày xác nhận: ${content.confirmedDate}</li>
        </ul>
      </div>
    `
  return template
}
const fakePos = [
  { lat: 22.62330127532687, lng: 105.88041577374455 },
  { lat: 21.175869072571295, lng: 104.47416577374455 },
  { lat: 22.125500828447276, lng: 103.26566967999455 },
  { lat: 20.87848168677269, lng: 105.38603100811955 },
  { lat: 21.64636026036335, lng: 106.62748608624455 },
  { lat: 21.493105851564483, lng: 105.51786694561955 },
  { lat: 21.533989531769414, lng: 107.04496655499455 },
  { lat: 20.457032476632538, lng: 105.41898999249455 },
  { lat: 20.888746284089258, lng: 105.35307202374455 },
  { lat: 21.515626584819508, lng: 106.63079896303609 },
  { lat: 21.477293630340732, lng: 106.97412171694234 },
  { lat: 21.44406357166034, lng: 105.62005677553609 },
  { lat: 22.53913851012798, lng: 106.01281800600484 },
  { lat: 22.320802429475886, lng: 105.62005677553609 },
  { lat: 22.29793348411974, lng: 106.42755189272359 }
]
</script>

<style>
.app-container {
  padding: 20px
}

* {
  font-family: "Times New Roman", sans-serif;
}

#map {
  width: 50vw;
  height: 78vh;
  display: inline-block;
  border-radius: 4px;
}
.custom-box-card-header{
  border-radius: 16px;
  background: linear-gradient(90deg, white 0%, #daffff 100%);
}

#details {
  width: 39vw;
  height: 78vh;
  /*background-color: #2ac06d;*/
  display: inline-block;
  float: right;
  font-size: small;
}

#history {
  width: 36vw;
  height: 62vh;
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}

#history::-webkit-scrollbar { /* WebKit */
  width: 0px;
}

.patient-details-list {
  list-style-type: none;
  margin: 0px;
  padding: 0px;
  padding-bottom: 50px;
  font-size: small;
}

.patient-details-list > li {
  margin-bottom: 15px;
}
</style>
