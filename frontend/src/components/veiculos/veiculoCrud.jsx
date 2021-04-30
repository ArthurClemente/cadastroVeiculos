import React, {Component} from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'car',
    title: 'Cadastro de veículos'
}

const baseUrl = 'http://localhost:3001/veiculos'

const initialState = {
    veiculo: { Modelo: '', Marca: '', Valor: '', Observações: '' },
    list: []
}

export default class VeiculoCrud extends Component {
    
    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }
    
    clear() {
        this.setState({ veiculo: initialState.veiculo })
    }

    save() {
        const veiculo = this.state.veiculo
        const metodo = veiculo.id ? 'put' : 'post'
        const url = veiculo.id ? `${baseUrl}/${veiculo.id}` : baseUrl
        axios[metodo](url, veiculo)
            .then(resp => {
                const list = this.listaAtualizada(resp.data)
                this.setState({ veiculo: initialState.veiculo, list })
            })
    }

    listaAtualizada(veiculo, add = true) {
        const list = this.state.list.filter(v => v.id !== veiculo.id)
        if(add) list.unshift(veiculo)
        return list
    }

    atualizarCampo(event) {
        const veiculo = { ...this.state.veiculo }
        veiculo[event.target.name] = event.target.value
        this.setState({ veiculo })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Modelo</label>
                            <input type="text" className="form-control" 
                                name="Modelo"
                                value={this.state.veiculo.Modelo}
                                onChange={e => this.atualizarCampo(e)}
                                placeholder="Digite o modelo do veículo..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Marca</label>
                            <input type="text" className="form-control"
                                name="Marca"
                                value={this.state.veiculo.Marca}
                                onChange={e => this.atualizarCampo(e)}
                                placeholder="Digite a marca..." />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Valor</label>
                            <input type="number" className="form-control"
                                name="Valor"
                                value={this.state.veiculo.Valor}
                                onChange={e => this.atualizarCampo(e)}
                                placeholder="Informe o valor do veículo..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Observações</label>
                            <input type="text" className="form-control"
                                name="Observações"
                                value={this.state.veiculo.Observações}
                                onChange={e => this.atualizarCampo(e)}
                                placeholder="Observações..." />
                        </div>
                    </div>
                </div>

                <hr/>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(veiculo) {
        this.setState({ veiculo })
    }

    remover(veiculo) {
        axios.delete(`${baseUrl}/${veiculo.id}`).then(resp => {
            const list = this.listaAtualizada(veiculo, false)
            this.setState({ list })
        })
    }

    renderTabela() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Modelo</th>
                        <th>Marca</th>
                        <th>Valor</th>
                        <th>Observações</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderLinhas()}
                </tbody>
            </table>
        )
    }

    renderLinhas() {
        return this.state.list.map(veiculo => {
            return (
                <tr key={veiculo.id}>
                    <td>{veiculo.Modelo}</td>
                    <td>{veiculo.Marca}</td>
                    <td>{veiculo.Valor}</td>
                    <td>{veiculo.Observações}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(veiculo)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remover(veiculo)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }
    
    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTabela()}
            </Main>
        )
    }
}