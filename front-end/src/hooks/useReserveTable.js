import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import { toast } from 'sonner';
import { extractErrorMessages } from '../utils/extractErrorMessages';
import { useSiteInfo } from './useSiteInfo';

const parseTimeRange = (rangeStr) => {
  if (!rangeStr) return null;
  try {
    const parts = rangeStr.split('-');
    if (parts.length !== 2) return null;

    const format24 = (t12) => {
      const match = t12.trim().match(/(\d+):(\d+)\s*(AM|PM)?/i);
      if (!match) return "00:00";
      let hrs = parseInt(match[1], 10);
      const mins = match[2];
      const modifier = match[3]?.toUpperCase();

      if (hrs === 12) hrs = 0;
      if (modifier === 'PM') hrs += 12;

      return `${hrs.toString().padStart(2, '0')}:${mins}`;
    };

    return {
      min: format24(parts[0]),
      max: format24(parts[1])
    };
  } catch (e) {
    return null;
  }
};

export const useReserveTable = (onSuccess) => {
  const queryClient = useQueryClient();
  const { data: siteInfo } = useSiteInfo();

  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: '2 People',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const onlyNums = value.replace(/[^0-9]/g, '');
      if (onlyNums.length <= 10) {
        setFormData(prev => ({ ...prev, [name]: onlyNums }));
      }
      return; 
    }
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  let minTime = null;
  let maxTime = null;
  let currentWorkingHoursStr = "";

  if (formData.date && siteInfo?.workingHours) {
    const dateObj = new Date(formData.date);
    const isSunday = dateObj.getDay() === 0;
    currentWorkingHoursStr = isSunday ? siteInfo.workingHours.sunday : siteInfo.workingHours.weekdays;
    
    const parsed = parseTimeRange(currentWorkingHoursStr);
    if (parsed) {
      minTime = parsed.min;
      maxTime = parsed.max;
    }
  }

  const validateDateTime = () => {
    if (!formData.date || !formData.time) return null;
    const selectedDateTime = new Date(`${formData.date}T${formData.time}`);
    const now = new Date();

    if (selectedDateTime < now) {
      return "You cannot book a table for a past date or time.";
    }

    if (minTime && maxTime && currentWorkingHoursStr) {
      if (formData.time < minTime || formData.time > maxTime) {
        return `We are open from ${currentWorkingHoursStr} on this date.`;
      }
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.full_name || !formData.phone || !formData.date || !formData.time) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.phone.length !== 10) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    const dateError = validateDateTime();
    if (dateError) {
      setError(dateError);
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/bookings/create/', formData);

      if (response.data.status === "success" || response.data.status === true) {
        queryClient.invalidateQueries({ queryKey: ["bookings"] });
        toast.success(response.data.message || "Table booked successfully!");
        
        setFormData({
          full_name: '',
          phone: '',
          email: '',
          date: '',
          time: '',
          guests: '2 People',
          notes: ''
        });

        if (onSuccess) onSuccess();
      } else {
        setError(response.data.message || "Failed to book table.");
      }
    } catch (err) {
      setError(extractErrorMessages(err));
    } finally {
      setLoading(false);
    }
  };

  return { formData, loading, error, handleChange, handleSubmit, minTime, maxTime };
};