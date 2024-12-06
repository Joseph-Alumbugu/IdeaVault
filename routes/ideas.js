const express = require('express')
const router = express.Router()
const Idea = require('../models/Idea')


//GET ALL IDEAS
router.get('/', async (req, res) => {
    try{
      const ideas = await Idea.find()
      res.json({success:true, data:ideas})
    }catch(error){
      res.status(500).json({success:false, message: 'something went wrong'})
    }
    
  });
  

//GET SINGLE IDEAS
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  // Validate ID format
  if (!id || id.trim().length !== 24) {
      return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
      // Fetch idea by ID
      const idea = await Idea.findById(id);

      if (!idea) {
          return res.status(404).json({ success: false, message: "Idea not found" });
      }

      res.status(200).json({ success: true, data: idea });
  } catch (error) {
      console.error("Error fetching idea:", error);
      res.status(500).json({ success: false, message: "Something went wrong" });
  }
});


//ADD AN Idea
router.post('/', async (req,res) => {
    const idea = new Idea({
        text: req.body.text,
        tag:req.body.tag,
        username:req.body.username,      
    })
    
   try {
      const savedIdea = await idea.save()
      res.send({success:true , data:savedIdea})
   } catch (error) {
      
      res.status(500).json({success : false, message: 'something went wrong'})
   }
})


router.put('/:id', async (req,res) => {
  
  const id = req.params.id.trim()
  const idea = await Idea.findById(req.params.id)
     try {
      if(idea.username = req.body.username){
        const updateIdea = await Idea.findByIdAndUpdate(id,
  
       {
        $set:{
          text:req.body.text,
          tag:req.body.tag,
          username:req.body.username
        }
       },
       {new: true})
  
        return res.send({success:true, data:updateIdea})
      }

      res.status(403).json({success:false, error:'you are unauthorized to delete'})
     } catch (error) {
      console.log(error)
      res.status(500).json({success : false, message: 'something went wrong'})
     }
  })

  router.delete('/:id', async (req,res) => {
     try {
      const idea = await Idea.findById(req.params.id)
      if(idea.username = req.body.username){
        await Idea.findByIdAndDelete(req.params.id)
        return res.json({success:true, data:{}})
      }
      res.status(403).json({success:false, error:'you are unauthorized'})
    } catch (error) {
      res.status(500).json({success:false, error:'something went wrong'})
    }
  
    
  })

module.exports = router