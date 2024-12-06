import ideasApi from "../Services/ideasApi"

class IdeaList {
    constructor() {
        this._ideaListEl = document.querySelector('#idea-list')
        this._ideas = [
            
        ]
        this._validTag = new Set()
        this._validTag.add('technology')
        this._validTag.add('software')
        this._validTag.add('business')
        this._validTag.add('database')
        this._validTag.add('development')
        this._validTag.add('inventions')
        this.getIdeas()
    }
    addEventListeners() {
        this._ideaListEl.addEventListener('click',(e) =>{
            if(e.target.classList.contains('fa-times')){
                e.stopImmediatePropagation()
                const ideaId = e.target.parentElement.parentElement.dataset.id;
                this.deleteIdea(ideaId);

            }
        })
    }
    async getIdeas () {
        try{
            const res = await ideasApi.getIdeas()
            this._ideas = res.data.data
            this.render()
        }catch(error){
            console.log(error)
        }
    }

   async deleteIdea(ideaId) {
        try {
            const res = await ideasApi.deleteIdea(ideaId) 
            this._ideas.filter((idea) => {
                idea._id !== ideaId
            })
            this.getIdeas()
        } catch (error) {
            alert('you cannot delete this idea')
        }
    }

    addIdeaToList(idea){
        this._ideas.push(idea)
        this.render()
    }

    getTagClass(tag) {
        tag = tag.toLowerCase()
        let tagClass = ''
        if(this._validTag.has(tag)){
            tagClass = tag
        }else{
            tagClass = ''
        }

        return tagClass
    }
    render() {
        this._ideaListEl.innerHTML = this._ideas.map(idea => {
            let tagClass = this.getTagClass(idea.tag)
            const deleteBtn = idea.username === localStorage.getItem('username') ? `<button class="delete"><i class="fas fa-times"></i></button>`:''
            return`
            <div class="card" data-id="${idea._id}">
            ${deleteBtn}
            <h3>
            ${idea.text}
            </h3>
            <p class="tag tag-${tagClass}">${idea.tag.toUpperCase()}</p>
             <p>
            Posted on <span class="date">${idea.createdAt}</span> by
            <span class="author">${idea.username}</span>
            </p>
            </div>
            `
        }).join('')
       this.addEventListeners()
    }
}

export default IdeaList