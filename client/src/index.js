import './CSS/style.css'
import '@fortawesome/fontawesome-free/css/all.css'
import Modal from './component/Modal'
import IdeaForm from './component/Ideaform'
import IdeaList from './component/IdeaList'

const modal = new Modal()
const ideaform = new IdeaForm()
ideaform.render() 
const Idealist = new IdeaList()
Idealist.render()

