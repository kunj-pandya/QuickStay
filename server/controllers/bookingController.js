import Booking from "../models/Booking.js"
import Hotel from "../models/hotel.js";
import Room from "../models/Room";


// Function to check Availability of room
const checkAvailability = async ({ chechInDate, chechOutDate, room }) => {
    try {
        const bookings = await Booking.find({
            room,
            checkInDate: { $lte: chechOutDate },
            checkOutDate: { $gte: chechInDate },
        });
        const isAvailable = bookings.length === 0;
        return isAvailable;
    } catch (error) {
        console.error(error.message);
    }
}

// API to check availability
// POST /api/bookings/check-availability

export const checkAvailabilityAPI = async (req, res) => {
    try {
        const { room, chechInDate, chechOutDate } = req.body;
        const isAvailable = await checkAvailability({ chechInDate, chechOutDate, room });
        res.json({ success: true, isAvailable })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// API to create a new Booking
// POST /api/bookings/book

export const createBooking = async (req, res) => {
    try {
        const { room, chechInDate, chechOutDate, guests } = req.body;
        const user = req.user._id;

        // Before Booking Check Availability
        const isAvailable = await checkAvailability({
            chechInDate,
            chechOutDate,
            room,
        });

        if (!isAvailable) {
            return res.json({ success: false, message: "Room is not Available" })
        }

        // Get totalPrice from Room
        const roomData = await Room.findById(room).populate("hotel");
        let totalPrice = roomData.pricePerNight;

        // Calculate totalPrice based on nights
        const checkIn = new Date(chechInDate)
        const checkOut = new Date(chechOutDate)
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

        totalPrice *= nights;
        const Booking = await Booking.create({
            user,
            room,
            hotel: roomData.hotel._id,
            guests: +guests,
            chechInDate,
            chechOutDate,
            totalPrice,
        })
        res.json({ success: true, message: "Booking Created successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to create bookings" });
    }
}

// API to get all bookings for user
// GET /api/bnookigs/user
export const getUserBookings = async (req, res) => {
    try {
        const user = req.user._id;
        const bookings = await Booking.find({ user }).populate("room hotel").sort({ createdAt: -1 })
        res.json({ success: true, bookings });
    } catch (error) {
        res.json({ success: false, message: "Failed to fetch bookings" });
    }
}

export const getHotelBookings = async (req, res) => {
    try {
        const hotel = await Hotel.findOne({ owner: req.auth.userId });
        if (!hotel) {
            return res.json({ success: false, message: "No Hotel found" });
        }
        const bookings = await Booking.find({ hotel: hotel._id }).populate("room hotel user").sort({ createdAt: -1 });

        // Total Bookings
        const totalBokings = bookings.length;
        // Total Revenue
        const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0)
        res.json({ success: true, dashboardData: { totalBokings, totalRevenue, bookings } })
    } catch (error) {
        res.json({ success: false, message: "Failed to fetch Bookings" });
    }
}

