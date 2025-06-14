const Loader = () => {
  return (
    <div className={`w-[100vw] h-[100vh] grid place-items-center `}>
      {' '}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-1/12 max-h-30">
        <rect fill="#635FC7" stroke="#635FC7" strokeWidth="15" width="30" height="30" x="25" y="85">
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur="2"
            values="1;0;1;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.4"></animate>
        </rect>
        <rect fill="#635FC7" stroke="#635FC7" strokeWidth="15" width="30" height="30" x="85" y="85">
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur="2"
            values="1;0;1;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.2"></animate>
        </rect>
        <rect
          fill="#635FC7"
          stroke="#635FC7"
          strokeWidth="15"
          width="30"
          height="30"
          x="145"
          y="85">
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur="2"
            values="1;0;1;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="0"></animate>
        </rect>
      </svg>
    </div>
  );
};

export default Loader;
