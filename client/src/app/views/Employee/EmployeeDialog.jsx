import React from 'react'
import { getProvinces, getDistricts, getCommunes } from './EmployeeService'
import {
    Dialog, DialogTitle, DialogContent, IconButton, Icon,
    Grid,
    TextField,
    Button,
    InputLabel,
    Select,
    MenuItem,
    FormControl
} from '@material-ui/core'

class EmployeeDialog extends React.Component {

    state = {
        formData: {
            code: '',
            name: '',
            age: '',
            email: '',
            phone: '',
            province: null,
            district: null,
            commune: null
        },
        provinces: [],
        districts: [],
        communes: [],

        gender: '',
        listGender: ['Nam', 'Nữ', 'Cú có gai']
    }

    handleInput = (e) => {
        const { name, value } = e.target
        this.setState({
            formData: {
                ...this.state.formData,
                [name]: value
            }
        })
    }

    handleChangeAddress = (e, key) => {
        if (key === 'province') {
            this.setState({
                formData: {
                    ...this.state.formData,
                    district: null,
                    commune: null,
                    [key]: e.target.value
                }
            })
        } else {
            this.setState({
                formData: {
                    ...this.state.formData,
                    [key]: e.target.value
                }
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.submitData(this.state.formData)
    }

    getCommunesByDistrict = (district) => {
        return (
            this.state.communes.filter((item) => {
                return item.district.id === district.id
            })
        )
    }

    componentDidMount() {
        this.setState({
            formData: {
                ...this.state.formData,
                ...this.props.currentData
            }
        })
        getProvinces({}).then((data) => this.setState({
            provinces: [...data.data.data]
        }))
        getDistricts({}).then((data) => this.setState({
            districts: [...data.data.data]
        }))
        getCommunes({}).then((data) => this.setState({
            communes: [...data.data.data]
        }))
    }

    render() {

        let {
            formData,
            provinces,
            districts,
            communes,
            gender,
            listGender
        } = this.state

        const { closeDialog, type } = this.props

        return (
            <Dialog open={true}
                onClose={closeDialog}
                maxWidth={'md'}
                fullWidth
                className='overflow-hidden'
                style={{ overflow: 'hidden' }}
            >
                <Grid container
                    alignItems='center'
                    justify='space-between'
                    style={{ borderBottom: '1px solid #ddd' }}
                >
                    <Grid item>
                        <DialogTitle >
                            <span style={{ color: '#358600' }}>{type === 'add' ? 'Thêm nhân viên' : 'Sửa thông tin'}</span>
                        </DialogTitle>
                    </Grid>
                    <Grid item style={{ marginRight: '20px' }}>
                        <IconButton size="small" onClick={closeDialog}
                        >
                            <Icon fontSize="small" color="error">closeDialog</Icon>
                        </IconButton>
                    </Grid>
                </Grid>
                <DialogContent
                    style={{ overflow: 'hidden', margin: '20px 0' }}
                >
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <Grid container spacing={3} direction="column">
                            <Grid item container spacing={2}>
                                <Grid xs={6} item >
                                    <TextField value={formData.name} name="name" onChange={(e) => this.handleInput(e)} label='Họ và Tên' variant='outlined' size='small' fullWidth required autoFocus />
                                </Grid>
                                <Grid xs={3} item >
                                    <TextField value={formData.age} name="age" onChange={(e) => this.handleInput(e)} label='Tuổi' variant='outlined' size='small' fullWidth required />
                                </Grid>
                                <Grid xs={3} item size="small">
                                    <FormControl size='small' fullWidth variant='outlined'>
                                        <InputLabel id="gender">Giới tính</InputLabel>
                                        <Select
                                            labelId="gender"
                                            value={gender}
                                            label="Giới tính"
                                            onChange={(e) => this.setState({ gender: e.target.value })}
                                        >
                                            {listGender.map((item, index) => {
                                                return (
                                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid item container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField value={formData.email} name="email" onChange={(e) => this.handleInput(e)} label='Email' variant='outlined' size='small' fullWidth required />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField value={formData.phone} name="phone" onChange={(e) => this.handleInput(e)} label='Số điện thoại' variant='outlined' size='small' fullWidth required />
                                </Grid>
                            </Grid>

                            <Grid item >
                                <TextField value={formData.code} name="code" onChange={(e) => this.handleInput(e)} label='Code' variant='outlined' size='small' fullWidth required />
                            </Grid>

                            <Grid item container spacing={2}>

                                <Grid xs={4} item>
                                    <FormControl size='small' fullWidth variant='outlined' required>
                                        <InputLabel id="tinh">Tỉnh/Thành Phố</InputLabel>
                                        <Select
                                            labelId="tinh"
                                            value={formData.province}
                                            label="Tỉnh/Thành Phố"
                                            onChange={(e) => this.handleChangeAddress(e, 'province')}
                                        >
                                            {provinces && provinces.map(item => {
                                                return (
                                                    <MenuItem key={item.id} value={item}>{item.name}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid xs={4} item>
                                    <FormControl size='small' fullWidth variant='outlined' required>
                                        <InputLabel id="huyen">Quận/Huyện</InputLabel>
                                        <Select
                                            labelId="huyen"
                                            value={formData.district}
                                            label="Quận/Huyện"
                                            onChange={(e) => this.handleChangeAddress(e, 'district')}
                                        >
                                            {
                                                formData.province
                                                    ? districts && districts.map(item => {
                                                        return (
                                                            <MenuItem key={item.id} value={item}>{item.name}</MenuItem>
                                                        )
                                                    })
                                                    : <MenuItem color='primary' disabled>Chọn tỉnh trước</MenuItem>
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid xs={4} item>
                                    <FormControl size='small' fullWidth variant='outlined' required>
                                        <InputLabel id="xa">Xã/Phường</InputLabel>
                                        <Select
                                            labelId="xa"
                                            value={formData.commune}
                                            label="Xã/Phường"
                                            onChange={(e) => this.handleChangeAddress(e, 'commune')}
                                        >
                                            {
                                                formData.district
                                                    ? (this.getCommunesByDistrict(formData.district)).map(item => {
                                                        return (
                                                            <MenuItem key={item.id} value={item}>{item.name}</MenuItem>
                                                        )
                                                    })
                                                    : <MenuItem color='primary' disabled>Chọn huyện trước</MenuItem>
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid item container direction='row' spacing={2} justify='flex-end' style={{ padding: '10px' }}>
                                <Grid item>
                                    <Button variant='contained' color='secondary' onClick={closeDialog}>Hủy</Button>
                                </Grid>
                                <Grid item>
                                    <Button type='submit' variant='contained' color='primary' >Lưu</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>
        )
    }

}

export default EmployeeDialog