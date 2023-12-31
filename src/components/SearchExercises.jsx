import React, { useEffect, useState } from 'react'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { exerciseOptions, fetchData } from '../utils/fetchData'
import HorizontalScrollbar from './HorizontalScrollbar'

const SearchExercises = () => {
    const [search, setSearch] = useState('')
    const [exercises, setExercises] = useState([])
    const [bodyParts, setBodyParts] = useState([])
    const url= 'https://exercisedb.p.rapidapi.com/exercises'
    useEffect(() => {
        const fetchExercisesData = async () => {
            const bodyPartsData = await fetchData(`${url}/bodyPartList`, exerciseOptions)
            setBodyParts(['all', ...bodyPartsData])
        }
    }, [])

    
    const handleSearch = async () => {
        if(search) {
            const exercisesData = await fetchData(url, exerciseOptions)
            const searchExercises = exercisesData.filter((exercise) => exercise.name.toLowerCase().includes(search) || exercise.target.toLowerCase().includes(search) || exercise.equitment.toLowerCase().includes(search) || exercise.bodyPart.toLowerCase().includes(search))
            setSearch('')
            setExercises(searchExercises)
        }
    }

  return (
    <Stack alignItems='center' mt='37px' justifyContent='center' p='20px'>
      <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', sx: '30px'}}} mb="50px" textAlign='center'>Awesome Exercises You Should Know</Typography>
      <Box position='relative' mb='72px'>
        <TextField height="76px" value={search} onChange={e => setSearch(e.target.value.toLowerCase())} placeholder='Search Exercises' type='text' sx={{ input: {fontWeight: '700', border: 'none', borderRadius: '4px'}, width: { lg: '800px', xs: '350px'}, backgroundColor: '#fff', borderRadius: '40px'}} />
        <Button className='search-btn' sx={{ bgcolor: '#FF2625', color: '#fff', textTransform: 'none', width: { lg: '175px', xs: '80px'}, fontSize: {lg: '20px', xs: '14px'}, height: '56px', position: 'absolute', right: '0'}} onClick={handleSearch}>Search</Button>
      </Box>
      <Box sx={{ position: 'relative', width: '100%', p: '20px'}}>
        <HorizontalScrollbar data={bodyParts} />
      </Box>
    </Stack>
  )
}

export default SearchExercises
