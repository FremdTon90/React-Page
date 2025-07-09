// src/pages/Coding.js
import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'

import CodingOverview from './Coding/CodingOverview'
import CodingDetail from './Coding/CodingDetail'
import ScrollToTop from '../components/ScrollToTop'

export default function Coding() {
  const location = useLocation()

  return (
    <>
      <ScrollToTop key={location.key} />
      <Routes>
        <Route path="/" element={<CodingOverview />} />
        <Route path=":id" element={<CodingDetail />} />
        <Route path="*" element={<Navigate to="/coding" replace />} />
      </Routes>
    </>
  )
}
