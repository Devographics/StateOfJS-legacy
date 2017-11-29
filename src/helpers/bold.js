const parseBold = s => s.replace(/\*([^*]+)\*/g, '<b>$1</b>')

export default parseBold
