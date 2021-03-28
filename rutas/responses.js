module.exports = {
  
  resultItems: function(items) {
    return {
      result: {
        items,
        total: items.length
      }
    }
  },
  deletedItems: function(total){
    return {
      result: {
        totalFound: total
      }
    }
  }, 
  error: function(msg){
    return { 
      error: { 
        msg 
      }
    }
  }
}
