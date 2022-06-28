/* eslint-disable prettier/prettier */
//  este componente sera el reproductor solo, insertado en el playerBar

import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Flex,
  Text,
} from "@chakra-ui/react";
//  controla la reproducción
import ReactHowler from "react-howler";
import { useEffect, useRef, useState } from "react";
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from "react-icons/md";
//  cogera las acciones definidas en /lib/store
import { useStoreActions } from "easy-peasy";
//  para formatear el tiempo de la canción a minutos
import { formatTime } from "../lib/formatters";

//  recibirá la lista de canciones y la canción activa
const Player = ({ songs, activeSong }) => {

  // console.log("desde player: ", songs);
  // console.log("desde player: ", activeSong.duration);
  
  //  para controlar la canción que se esta reproduciendo
  const [playing, setPlaying] = useState(true);
  //  controlará el index de la canción activa
  const [index, setIndex] = useState(
    songs.findIndex((s) => s.id === activeSong.id)
  );
  //  permite manejar la barra de busqueda del tiempo de la canción
  const [seek, setSeek] = useState(0.0);
  //  para que no avance mientras se mueva la barra
  const [isSeeking, setIsSeeking] = useState(false);
  //  controla si esta en modo repetición
  const [repeat, setRepeat] = useState(false);
  //  controla si esta en modo aleatorio
  const [shuffle, setShuffle] = useState(false);
  //  para la duración total de la canción
  const [duration, setDuration] = useState(0.0);
  const soundRef = useRef(null);
  const repeatRef = useRef(repeat);
  //  para fijar la canción activa
  const setActiveSong = useStoreActions((state: any) => state.changeActiveSong);

  //  renderiza la animación del reproductor
  useEffect(() => {
    let timerId;

    if (playing && !isSeeking) {
      // console.log("PLAYING AN NOT SEEKING", soundRef.current);
      
      const f = () => {
        setSeek(soundRef.current.seek());
        timerId = requestAnimationFrame(f);
      };
      timerId = requestAnimationFrame(f);
      return () => cancelAnimationFrame(timerId);
    }
    cancelAnimationFrame(timerId);
  }, [playing, isSeeking]);

  //  renderiza la canción activa
  useEffect(() => {
    setActiveSong(songs[index]);
  }, [index, setActiveSong, songs]);

  //  guarda la referencia a la canción si esta en repeat
  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  //  cambia la animación del boton play/pause a la contraria
  const setPlayState = () => {
    setPlaying((state) => !state);
  };
  // cambia el modo aleatorio entre activo e inactivo
  const onShuffle = () => {
    setShuffle((state) => !state);
  };
  // cambia el modo repetición entre activo e inactivo
  const onRepeat = () => {
    setRepeat((state) => !state);
  };
  // va a la cancion anterior
  const prevSong = () => {
    setIndex((state) => {
      return state ? state - 1 : songs.length - 1;
    });
  };
  // va a la canción siguiente, si esta en shuffle va a otro no tiene por que ser la siguiente
  const nextSong = () => {
    setIndex((state) => {
      if (shuffle) {
        let next;
        do {
          next = Math.floor(Math.random() * songs.length);
        } while (next === state);
        return next;
      }
      return state === songs.length - 1 ? 0 : state + 1;
    });
  };

  //  para que se reproduzca toda la lista
  const onEnd = () => {
    if (repeatRef.current) {
      setSeek(0);
      soundRef.current.seek(0);
    } else {
      nextSong();
    }
  };

  //  para pasar el tiempo correcto, la duracion de la cancion
  const onLoad = () => {
    // console.log("player onLoad");

    const songDuration = soundRef.current.duration();
    // console.log("player onLoad", songDuration);
    setDuration(songDuration);
  };

  //  para poder mover la barra
  const onSeek = (e) => {
    setSeek(parseFloat(e[0]));
    soundRef.current.seek(e[0]);
  };
  

  return (
    <Box>
      <Box>
        {/* controla la cancion */}
        <ReactHowler
          playing={playing}
          src={activeSong?.url}
          ref={soundRef}
          onLoad={onLoad}
          onEnd={onEnd}
        />
      </Box>
      {/* Controles del reproductor */}
      <Center color="gray.600">
        <ButtonGroup>
          {/* modo aleatorio */}
          <IconButton
            outline="none"
            variant="link"
            aria-label="shuffle"
            color={shuffle ? "white" : "gray.800"}
            fontSize="24px"
            icon={<MdShuffle />}
            onClick={onShuffle}
          />
          {/* previous song */}
          <IconButton
            outline="none"
            variant="link"
            aria-label="previous"
            fontSize="24px"
            icon={<MdSkipPrevious />}
            onClick={() => prevSong()}
          />
          {/* play & pause */}
          {!playing ? (
            <IconButton
              outline="none"
              variant="link"
              aria-label="play"
              fontSize="40px"
              icon={<MdOutlinePlayCircleFilled />}
              onClick={setPlayState}
            />
          ) : (
            <IconButton
              outline="none"
              variant="link"
              aria-label="play"
              fontSize="40px"
              icon={<MdOutlinePauseCircleFilled />}
              onClick={setPlayState}
            />
          )}
          {/* next song */}
          <IconButton
            outline="none"
            variant="link"
            aria-label="next"
            fontSize="24px"
            icon={<MdSkipNext />}
            onClick={nextSong}
          />
          {/* modo repetición */}
          <IconButton
            outline="none"
            variant="link"
            aria-label="repeat"
            color={repeat ? "white" : "gray.800"}
            onClick={onRepeat}
            fontSize="24px"
            icon={<MdOutlineRepeat />}
          />
        </ButtonGroup>
      </Center>
      {/* Barra de progreso y valores  */}
      <Box color="gray.500">
        <Flex justify="center" align="center">
          {/* tiempo reproducido */}
          <Box width="10%">
            {/* seek sera el tiempo, se actualiza con useEffect */}
            <Text fontSize="xs">{formatTime(seek)}</Text>
          </Box>
          <Box width="80%">
            {/* los valores para la barra de progreso */}
            <RangeSlider
              aria-label={["min", "max"]} //    marca eslint como fallo pero es correcto
              step={0.1}
              min={0}
              id="player-range"
              max={duration ? (+duration.toFixed(2) as number) : 0}
              onChange={onSeek}
              value={[seek]}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
            >
              {/* barra de progreso total */}
              <RangeSliderTrack bg="gray.800">
                {/* barra de progreso llenada */}
                <RangeSliderFilledTrack bg="gray.500" />
              </RangeSliderTrack>
              {/* para poder pulsar en la barra de progreso y nos mueva el tiempo¿?¿? */}
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          {/* duracion de la cancion */}
          <Box width="10%" textAlign="right">
            <Text fontSize="xs">{formatTime(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Player;
