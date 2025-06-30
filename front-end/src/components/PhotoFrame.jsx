const PhotoFrame = ({ 
  imageUrl, 
  frameColor = 'bg-white',
  frameSize = 'p-4 pb-10',
  shadow = 'shadow-lg',
  className = '' 
}) => {
  return (
    <div className={`relative ${frameSize} ${frameColor} ${shadow} ${className}`}>
      {/* Main image area with subtle texture */}
      <div className="relative overflow-hidden bg-gray-50">
        <img 
          src={imageUrl} 
          alt="Polaroid photo" 
          className="block w-full h-auto border-b border-gray-200"
        />
        
        {/* Film grain texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogIDxmaWx0ZXIgaWQ9Im5vaXNlIj4KICAgIDxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjA1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+CiAgICA8ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIi8+CiAgPC9maWx0ZXI+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4wMiIvPgo8L3N2Zz4K')] opacity-10 pointer-events-none" />
      </div>
      
     
    </div>
  );
};

export default PhotoFrame;