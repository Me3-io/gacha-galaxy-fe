import styled from "./styled.module.scss";

const MapBg = ({ id }: any) => {
  return (
    <svg
      id={id}
      width="1728"
      height="1506"
      viewBox="0 0 1728 1506"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={styled.map}
    >
      <rect width="1728" height="1506" fill="url(#pattern0_97_2)" />
      <defs>
        <pattern id="pattern0_97_2" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_97_2" transform="scale(0.000578704 0.000664011)" />
        </pattern>
        <image
          id="image0_97_2"
          width="1728"
          height="1506"
        />
      </defs>
    </svg>
  );
};
export default MapBg;