-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 10, 2025 at 03:43 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dongvan_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `Chapters`
--

CREATE TABLE `Chapters` (
  `chapter_id` int(11) NOT NULL,
  `story_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `is_vip` tinyint(1) DEFAULT 0,
  `price` int(11) DEFAULT 0,
  `chap_ads_content` varchar(1000) DEFAULT NULL,
  `word_count` int(11) DEFAULT 0,
  `view_count` int(11) DEFAULT 0,
  `chap_number` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Chapters`
--

INSERT INTO `Chapters` (`chapter_id`, `story_id`, `title`, `content`, `is_vip`, `price`, `chap_ads_content`, `word_count`, `view_count`, `chap_number`, `created_at`) VALUES
(17, 20, 'Ông thân tôi là “mòng”', '<p>Chương1: Ông thân tôi là “mòng”</p><p>&nbsp;</p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Nụ cười vẫn thường lộ trên cặp môi đỏ tựa thoa son, anh Vân bỗng ủ dột, muốn như cỏ vẻ chán đời.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Do lẽ gì, cái thái độ trái ngược như vậy? Vì ông thân anh, một cụ phán thượng hạng đã về hưu, hưu bổng hàng tháng rất to, với bà mẫu anh, một người mẹ đảm, đã một tay tậu nổi mấy toà nhà lộng lẫy mà không để cho anh được tự do tiêu, phá chăng? Vì ý trung nhân của anh, một cô gái tân thời óc chửa đầy những tình cảm đã phụ anh chăng? Hay vì mảnh bằng tốt nghiệp của trường cao đẳng thương mại chưa cho phép anh được chiếm một ghế ngồi trong một.công sở? Lạ! Con một nhà giàu, lại sẽ, là chồng một mĩ nhân, địa vị như thế, tại sao anh Vân lại chán đởi? Cái buồn của anh chàng này chắc có chứa sự bỉ mật gì đây...</span></p><p class=\"ql-align-center\"><span style=\"color: rgb(34, 34, 34);\">° ° °</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Chiều hôm ấy, anh Vân ghé vào tai tôi:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Tôi đã đỡ được nỗi chán đời vì đã tìm ra được cách mở két của ông cụ. Tôi mới có được một&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">mẻng</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;rất đáng yêu cả tinh thần lẫn xác thịt nhưng phải cái hơi đáng giận là có cái đức lớn trong sự tiêu tiền.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Tôi rất lấy làm phàn nàn về điều đỏ, nhưng biết làm thế nào? Phụ nữ bây giờ hầu hết thế cả! Tình thế này ép tôi phải tính... Đáng lẽ tôi cũng không dùng đến kế này, vì nó bất lịch sự quá, nhưng anh tính: ông cụ đưa tiền cho mình tiêu thì tỏ ý xót xa mà đến khi ngồi vào đám bạc, hết trăm này đến chục khác chẳng lấy làm tiếc, anh bảo thế thì còn gì ức cho mình hơn? Nói tới đó, anh ngắt câu chuyện, đưa ra cho tôi một lá thư còn ngỏ.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Ngoài bì đề:</span></p><p class=\"ql-align-justify\"><em style=\"color: rgb(34, 34, 34);\">Monsieur Ấm B...</em></p><p class=\"ql-align-justify\"><em style=\"color: rgb(34, 34, 34);\">N... Ruelle de poissions Hanhoi&nbsp;(1)</em></p><p class=\"ql-align-justify\"><em style=\"color: rgb(34, 34, 34);\">Còn trong thư:</em></p><p class=\"ql-align-justify\"><em style=\"color: rgb(34, 34, 34);\">Bắc Ninh, le 26 février 1933&nbsp;(2)</em></p><p class=\"ql-align-justify\"><em style=\"color: rgb(34, 34, 34);\">Thưa ngài,</em></p><p class=\"ql-align-justify\"><em style=\"color: rgb(34, 34, 34);\">Cùng nhau gắn bó đã bao nhiêu lần, tôi vẫn để ý mãi, nay thật đến lúc phải phiền ngài rồi đây. Mong ngài xếp cho một người có vẻ ông tham, ông phán, đúng chiều thứ bảy sang bên tôi có hàng. Chính ông thân tôi là mòng. chắc chắn lắm! Còn nhiều két khác nữa, nhưng tôi chưa dám cam đoan vội, vì chưa xếp xong. Chỉ cần người chơi tổ tôm, tài bàn giỏi thôi, không dùng đến bát, đã gì ca. Đáng lẽ tôi phai \"thân hành\" sang cầu cứu song bận thu xếp, phải dùng chữ thay người, có điều đường đột, ngài cũng xá đi cho. Và xin báo trước bằng thơ, nói rõ hình dạng người mà ngài phái sang, đễ chúng tôi ra ga đón cho tiện. Xin nhớ, chúng tôi ở phố Tiền An, số nhà...</em></p><p class=\"ql-align-justify\"><em style=\"color: rgb(34, 34, 34);\">Kính thư</em></p><p class=\"ql-align-justify\"><em style=\"color: rgb(34, 34, 34);\">Vân</em></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Xem xong, bốn mắt gặp nhau, tôi cố nhịn cười:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Anh gọi bịp về&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">bắt</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;ông cụ đấy à? Gớm! Có hiếu nhỉ!</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Anh Vân chỉ mỉm cười một cách khoái chí rồi lấy hồ dán kín phong thư.</span></p><p class=\"ql-align-center\"><span style=\"color: rgb(34, 34, 34);\">° ° °</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Hai hôm sau. Trên con đường chạy ra ga Bắc Ninh với hai dãy cây um tùm đứng giàn hai bên, một chiếc ô tô hàng đứng chờ, mấy cái xe cao su lượn nghênh ngang, lùng khách. Anh Vân rảo bước đi bên tôi, cầm một lá thư lẩm nhẩm: \"Đúng 6 giờ chiều, ở ga xuống, người nào mặc ta, cầm máy ảnh, mặc cả xe đến phố Tiền An là đích đấy...\"</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Đúng 6 giờ. Một hồi còi... Mười toa tàu lù lù hến đến sân ga, nhả ra độ mười hành khách. Có người gọi vợ, gọi con, mặc cả xe om sòm, có người bị phu xe túm bâu lấy mà chỉ biết kêu rối rít: \"Không, không !...\" Bỗng có một giọng dõng dạc, to hơn hết, nổi lên trong đám khách ồn ào:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Chủng mày, thằng nào biết, mau kéo tao đến phố Tiền Anh nhà cụ...</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Đây rồi !</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Phải, đích người này rồi. áo gấm trong, áo sa tanh ngoài, giày ban&nbsp;3, tay có cầm máy ảnh. Răng vàng hé lộ mỗi khi cười lệch miệng, kính đồi mồi nằm trên sống mũi dọc dừa nghiêm trang. Mặt láu lỉnh ra phết ăn người.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Ba chúng tôi bắt tay nhau. Anh Vân pha trò mà giới thiệu:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Đây là chú nó... còn ngài này... \"ân nhân\" của tôi !</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Ông&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">ân nhân của tôi</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;ấy là ông đến&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">giết</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;bố nó để&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">cứu</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;con, mấy phút sau, được anh Vân rước về nhà kêu rầm lên: \"Thưa thầy, thưa đẻ, có bác tham&nbsp;4&nbsp;Ngọc vốn là bạn cũ sang chơi với con\" thì được cả nhà đón chào mừng rỡ. Nhất là lại được ông cụ già đạo mạo tiếp đãi ân cần, tự đem thân ra đóng cái vai con chim&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">mòng</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;đậu vừa đúng tầm súng cho kẻ đi săn.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Cuộc gặp gỡ của chủ với khách bắt đầu gắn bó bằng một bữa cơm bề bộn những thịnh soạn. Trong bữa tiệc kéo luôn hai tiếng đồng hồ, người ta nói đến những chuyện giời nắng, giời mưa, nạn khủng hoảng&nbsp;5, cuộc chiến tranh Trung - Nhật, việc nhà nước thi hành chính sách tiết kiệm rút lương, thải bớt người làm. Ông \"tham Ngọc\" của anh Vân ăn nói ôn tồn, đóng cái vai kịch của mình một cách thạo lắm. Ông hết bàn luận về đạo nghị định ngày 6 Octobre 1931&nbsp;6&nbsp;lại làm ra mặt học rộng, đả động đến cả bộ \"mặt trái\" của hội Quốc Liên&nbsp;7. Có khi ông tự giới thiệu: chỉ ham đọc sách và gặp dịp nhàn thì chỉ du ngoạn những phong cảnh đẹp chớ ít khi để ý đến sự chơi bời. Thấy con người giỏi mà nết na như vậy, cụ phán khâm phục ông ra mặt, ngợi khen mãi ông là người hữu ích, chẳng lêu lổng như em Vân. Rồi cụ cười khà khà:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Dù bác không chơi bời gì thì tổ tôm, tài bàn cũng phải biết chứ?</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Nụ cười vẫn giữ trên môi, ông \"tham Ngọc\" thong thả đáp lại:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Bẩm vâng! Ngoài sự đọc sách với chơi ảnh ra, con cũng chẳng còn cách gì giải trí nữa. Đi hát ả đào hay rượu chè, hút xách thì tai hoạ, mà giai gái thì bẩm... chúng con đã quá tuổi rồi! Vả lại tổ tôm, tài bàn là cái chơi thanh nhã, khác nào như cuộc đấu trí. Con cho đó là một cách giải trí lịch sự mà người thượng lưu cần phải biết.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Thiết tưởng một phạm nhân can tội giết người mà được trạng sư&nbsp;8&nbsp;cãi cho trắng án cũng vị tất đã có lòng kính phục, ngưỡng mộ, nhớ ơn ông thầy cãi của mình như cụ phán của tôi kính phục, ngưỡng mộ, nhớ ơn ông \"trạng sư của tài bàn, tổ tôm\" lúc ấy. Đánh trúng vào chỗ yếu của ông cụ rồi, tay bịp già đã thèm nhận những lời ân cần mời mọc vào cuộc tài bàn ngay cho đâu!</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Bẩm con định sang hầu cụ với thăm anh Vân con rồi nhân tiện đi chụp ít ảnh vì cảnh những đồi Lim đẹp đã có tiếng... chứ không nghĩ đến sự sang đây lại được cụ ép đánh tài bàn !</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Cụ phán cố phân trần cho ra lẽ:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Nhưng còn cả ngày mai thì bác ngại gì? Tôi chỉ sợ bác chả đem nổi vài vạn tấm lánh sáng mà chụp cho xuể thôi.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Thế là thành cuộc. Bốn vai trò: ông \"tham Ngọc\"&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">người đi săn</em><span style=\"color: rgb(34, 34, 34);\">, anh Vân&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">người hướng đạo</em><span style=\"color: rgb(34, 34, 34);\">, ông thân sinh ra anh,&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">chim mòng</em><span style=\"color: rgb(34, 34, 34);\">, với tôi, một người tò mò, đi xem. Tôi rất lấy làm lạ vì cứ thấy vai con chim mòng thắng trận, ù tràn đi mà nhà đi săn kia đã phí gần hai mươi&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">viên đạn</em><span style=\"color: rgb(34, 34, 34);\">. Chính anh Vân cũng hơi tái mặt, chỉ sợ người mình lôi về chưa hẳn là thiện xạ, có bao nhiêu lại đến chui hết cả vào két của ông cụ thì...</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Làm ra bộ thua cay, nóng tiết, đang đánh một, hai, ba đồng, ông \"tham Ngọc\" rủ đánh gấp đôi.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Thưa cụ, đánh nhỏ con lại hay thua, có đánh to mới cao được.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Gặp hồi đỏ, ông cụ hăng hái như đang say rượu nhận lời liền! Thể là từ lúc đánh hai, bốn, sáu đồng, ông cụ năm thì mười hoạ mới được một ván ù suông. Ù tài bàn, sửu bàn&nbsp;9&nbsp;chỉ riêng về ông \"tham Ngọc\".</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Thấy số giấy bạc trước mặt, trong tủi mình cứ lần lượt chui ra rồi bay đi với gió, moi ví mãi nóng tiết, ông già thỉnh thoảng lại làm ván ké một \"rồng xanh\"&nbsp;10. Nhưng bao nhiêu cũng đều \"giá vũ đằng vân\" đi đâu mất cả!</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Cái ví lép kẹp của ông già giục cả làng&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">tan chầu</em><span style=\"color: rgb(34, 34, 34);\">, đứng lên:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Thôi, mời bác lên gác đi nghỉ với em. Bác đỏ và đánh cao quá, thật số bác hôm nay phát tài. Tôi thua dễ đến hơn sáu chục !...</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Ông cụ \"tuy không ăn ớt mà cay \" nhưng vẫn vui vẻ như thường, vẫn thản nhiên, lộ cái vẻ yêu con người đã lịch thiệp lại có biệt tài, đánh tài bàn cao.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Còn tôi, tuy tò mò ngồi để ý mất cả buổi tôi, cũng không sao khám phá nổi những ngón bịp ! Vậy \"mặt mũi\" những ngón bịp thế nào?</span></p><p class=\"ql-align-center\"><span style=\"color: rgb(34, 34, 34);\">° ° °</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Trên gác riêng của anh Vân, giữa lúc chia tiền.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Vốn tôi đem sang: mười lăm đồng, vốn bác: năm đồng, mà đây tám mươi ba tất cả, thế là cụ bị mất đút 63 đồng. Đáng lẽ ta chia ba, ông ấm B... ở Hà Nội với tôi hai, còn bác một. Nghĩa là cả ba&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">đạo binh</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;cùng hưởng: đoàn hướng đạo, đoàn quân thắng trận với bộ tham mưu. Nhưng&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">mòng</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;là cụ nhà bác thì bác cứ cầm bốn mươi&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">của</em><span style=\"color: rgb(34, 34, 34);\">. Anh em chúng tôi chỉ dùng 23&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">hòn đạn</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;là đủ rồi.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Trước cái thái độ nhã nhặn và biết điều này, anh Vân đáp bằng cái gật đầu, chìa tay ra nhận và nói:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Để lần sau bác sang, tôi gọi cho mấy&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">via</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;11&nbsp;nữa đến, rồi ta lại sẽ có dịp được chia hương hoả với nhau. Nhưng tôi muốn bác cho xem qua các&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">ngón</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;để sau này mà tránh...</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Nhà đi săn cười. Một cuộc phấn đẩu chốc lát trong óc anh chàng: bí mật nhà nghề, cỏ nên? Hay không?</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Sau một lúc lưỡng lự, \"ông tham\" có ý lấy chúng tôi làm chỗ đồng chí, cũng chẳng phải ngại gì. Chúng tôi ngồi nghe như hai cậu học trò trước một giáo sư dạy khoa quỷ thuật.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Có ba lối tài bàn. Thứ nhất: lối&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">đánh kiệu</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;hay là&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">nhị cập nhất</em><span style=\"color: rgb(34, 34, 34);\">, hai người thông lưng nhau hại một người bằng những luật nhất định như để tay vào đùi, vào gối, ống chân, bàn chân tuỳ theo quân chờ về hàng&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">văn</em><span style=\"color: rgb(34, 34, 34);\">, hàng&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">sách</em><span style=\"color: rgb(34, 34, 34);\">, hàng vạn... Muốn ăn quân gì hoặc chờ quân gì, cứ việc ra hiệu để bên kia để ý đánh cho mà ăn hoặc hạ ù. Nhưng đó chỉ là phương pháp của các bịp non, dễ lộ tẩy, nếu người ta nghi hoặc, khám bài thấy rõ sự đánh tầm bậy, gian lận thì nguy. Lối ấy không xứng đáng, tôi không thèm dùng.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Thứ nhì:&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">hụt nọc</em><span style=\"color: rgb(34, 34, 34);\">. Lối chơi này cần mĩ thuật lắm, người đánh phải có cả tài lẫn gan. Bắt&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">cái</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;xong, mình phải cầm lấy bài&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">nọc</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;vờ&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">chang</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;đi mấy lớp. Thế là vài ba quân đã theo cái&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">chang</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;chui lọt, nằm gọn trong tay áo mình rồi Đến lúc lên bài, phải&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">xoay</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;đi cho&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">phu</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;nào vào&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">phu</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;ấy,&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">lưng</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;nào vào&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">lưng</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;ấy, Thừa quân thì dễ ù lắm. Nếu ù... hạ bài xong cử để mặc làng khám cho kĩ. Xong đâu đấy, gạt cả ra một góc chiếu cho người chia bài... là mấy quân bài trốn thẻ\" trong tay áo đã thừa cơ chui tọt ra, theo cái lúc \"hỗn quân hỗn quan\", hợp với bọn lính thắng trận về cổng khải hoàn. Muốn đề phòng sự làng nghi ngờ, thấy mình ù nhiều mà điểm lại bài nọc, bài rìa, thì có hai cách&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">cản</em><span style=\"color: rgb(34, 34, 34);\">. Một là thấy mình hạ xong ông \"bạn đồng chí\" cầm ngay lấy phần nọc vờ tìm quân ông ta đang chờ, phàn nàn rầm lên, \"gọi chó\" rầm lên, ồ ạt xoá đi cho người kia không kịp điểm nữa. Hai là rút ở nọc lên mà ù. Quần bài chờ ấy lẽ tất nhiên là quân mình thụt được ở nọc từ trước đã giấu sẵn trong tay. Lúc xoa tay xuống nọc vờ rút nó lên thì trong lòng bàn tay phải có sẵn cả những quân mình đã hụt, trả vào&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">nọc</em><span style=\"color: rgb(34, 34, 34);\">, chỉ \"xách cổ\" lên một quân chờ ù. Đến thế thì ván nào mình ù, làng có điểm bài cũng không ngại gì nữa.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Lắm khi chơi với bọn thạo, không hụt nổi ở nọc thì mình phải dùng đến chước thứ ba, nghĩa là hụt vào phần bài của ông \"bạn đồng chí\" với mình. Bắt&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">cái</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;xong, cầm phần bài mình trong tay rồi, mình lại phải vớ lấy \"phần bài tòng phạm\" liệng trả ông bạn. Trong cái liệng rất ý tứ mà ít ai để ý ấy, ngón tay cái với ngón tay trỏ của mình đã \"họp đảng\" với nhau giữ lại vài quân, trập phắt vào phần mình. Thế là ông bạn cầm phần bài thiếu phải đánh bậy bạ cho qua cuộc, cốt sao \"che mắt thế gian\".</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Ấy, chỉ có thế thôi, bịp tài bàn cũng vậy hay tổ tôm cũng vậy..Cốt nhất phải có bộ mặt tài tử đóng kịch, nghiễm nhiên, bệ vệ, cũng cốt nhất là ngồi vào một chỗ không ai ám nổi, tránh cho xa những bác&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">chầu rìa</em><span style=\"color: rgb(34, 34, 34);\">. Trong cuộc giảng bài này, ông \"tham\" cho chúng tôi rõ cả phần thực hành lẫn phần lí thuyết. Nhanh như chớp, ông giở ngón có bảo trước cho biết mà chúng tôi chịu, không sao vớ được cái \"thiên biến vạn hoá\" của nhà quỷ thuật đại tài.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Bữa tiệc nào cũng phải có đồ nước nên nhà bạc bịp thuật thêm một câu chuyện ngắn nữa để làm món&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">đét-xe</em><span style=\"color: rgb(34, 34, 34);\">.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Một lần, ngồi vào cuộc với hai ông khách lạ mà tôi tưởng là&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">quých</em><span style=\"color: rgb(34, 34, 34);\">, tôi vờ&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">chang</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;bài nọc, hụt xong, để xuống đĩa thì bỗng phải giật mình lo sợ vì chỉ cuỗm có bốn quân mà sao phần nọc có lẽ thiếu nhiều? Đang mải ngẫm nghĩ thì một ông khách lạ nắm chặt lấy tay tôi. Cuống quá, đã tái cả mặt nhưng nhanh trí khôn, tôi cũng vội liều nắm chặt cổ tay ông ta làm cái \"trả miếng\". Rồi chúng tôi cùng buông nhau ra để cười sằng sặc, gập đôi người lại mà cười. Tôi hụt bốn quân bài thì ông khách ấy cũng hụt ba quân cộng với một quân. Ông ta chia thừa cho phần bài của ông mà tôi thì hụt nọc! Chúng tôi gọi buổi ấy là ngày \"anh hùng tương ngộ\", cũng là \"bịp lũa\" cả mà bên nọ còn tưởng bên kia là&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">mòng</em><span style=\"color: rgb(34, 34, 34);\">.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Trước mặt anh chàng dắt khách lấy hồ hòng chuyện nọ kia, mặt tiu nghỉu như chó bị thiến, chúng tôi vỗ vai nhau, bắt tay nhau một cách ân cần, gọi nhau là \"tri kỉ\".</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">--------------------------------</span></p><p class=\"ql-align-right\"><span style=\"color: rgb(34, 34, 34);\">1</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Ông Ấm B. sổ...phố Hàng Cá. Hà Nội.</span></p><p class=\"ql-align-right\"><span style=\"color: rgb(34, 34, 34);\">2</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Bắc Ninh. ngày 26 tháng 2 năm 1933.</span></p><p class=\"ql-align-right\"><span style=\"color: rgb(34, 34, 34);\">3</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Giày da mềm dùng những khi nhảy đầm.</span></p><p class=\"ql-align-right\"><span style=\"color: rgb(34, 34, 34);\">4</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Tham tán là nhân viên hành chính trung cấp của các cơ quan của Pháp.</span></p><p class=\"ql-align-right\"><span style=\"color: rgb(34, 34, 34);\">5</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Kinh tế khủng hoảng, nói tắt.</span></p><p class=\"ql-align-right\"><span style=\"color: rgb(34, 34, 34);\">6</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Mồng 6 tháng 10 năm 1931.</span></p><p class=\"ql-align-right\"><span style=\"color: rgb(34, 34, 34);\">7</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Hội các nước trên thế giới năm 1920, đến 1946 đổi thành tên Liên Hiệp Quốc.</span></p><p class=\"ql-align-right\"><span style=\"color: rgb(34, 34, 34);\">8</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Luật sư.</span></p><p class=\"ql-align-right\"><span style=\"color: rgb(34, 34, 34);\">9</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Ù tài bàn là ăn một ván bài to nhất, sửu bàn là to thử hai.</span></p><p class=\"ql-align-right\"><span style=\"color: rgb(34, 34, 34);\">10</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Giấy bạc hai mươi đồng.</span></p><p class=\"ql-align-right\"><span style=\"color: rgb(34, 34, 34);\">11</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Nói theo tiếng Pháp: vieux nghĩa là ông già.</span></p><p>&nbsp;</p>', 1, 5, '', 2636, 0, 1, '2025-09-10 11:47:27'),
(18, 20, 'Ông quân sư của bạc bịp', '<p>Chương 2: Ông quân sư của bạc bịp</p><p>&nbsp;</p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Ông nên biết rằng: quá nửa đởi người, tôi đã sổng bằng nghề cờ bạc. Muốn sống về nghề cờ bạc, phải cỏ cách trừ khử những cái đáng nơm nớp lo ngại là cái&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">đỏ</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;cái&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">đen</em><span style=\"color: rgb(34, 34, 34);\">... Hiện nay anh em tôn tôi là... trùm đảng bạc bịp. Trước khi lên được địa vị này, tôi cũng đã lắm phen phải đóng những vai trò&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">mòng</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;với&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">quých</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;cho một lũ bạc bịp tiền bối họ móc xé ruột gan đấy, ông ạ. Những lúc thất cơ lỡ vận trước là&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">vốn</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;buôn cho tôi được hưởng cái&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">lãi</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;là cái địa vị... bây giờ.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Người đang kể tiểu sử của mình ra cho tôi với anh Vân nghe chính là ông ấm B... ở ngõ Hàng Cá. Trong gian phòng gác mà cách bày biện đủ tỏ rằng chủ nhân cũng là hạng người thiệp đời, lịch sự, chúng tôi đã được ông trùm tiếp một cách nhã nhặn mà lại được cả dịp đón nhặt tài liệu cho cuộc phỏng vấn ngẫu nhiên đây.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Những người chỉ nghe danh mà không biết mặt ắt phải tưởng tượng rằng đến hạng người đáo để này thì từ nét mặt, giọng nói, dáng đi cho đến tà áo, gấu quần, tất nhiên cái gì cũng phải có vẻ bịp cả! Trái lại, ông ta là người trông đẫy đà, bệ vệ như một ông hậu bổ hoặc một viên tri châu&nbsp;1&nbsp;nào. Hai con mắt rất sắc sảo, có đủ vẻ đối địch với đởi, tiểu nhân cũng được mà quân tử cũng được. Miệng nói có duyên một cách lạ, thường hay mỉm cười để \"giá trị\" cho câu chuyện: nhất là những lúc gọi đến thằng nhỏ thì tiếng đồng sang sảng, thật là có giọng quan!</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Chúng tôi họp mặt nhau mới độ một giờ mà trong câu chuyện đã thấy ngay cái không khí nồng nàn, tri kỉ. Được dễ thân như thế là vì có anh Vân, người cùng đi với tôi để thăm ông ấm, trước nay đã làm \"chim mồi\" cho ông đê săn các bạn già cụ phán bên tỉnh Bắc cùng những tín đồ của \"đổ bác giáo\" bao nhiêu lần rồi.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Vì vậy, ông ấm mới chẳng ngại kể lể tâm sự và nói rõ cả những bí mật nhà nghề đáng giấu kín cho chúng tôi nghe. Nhưng trước khi cho biết những cái \"vành ngoài vành trong\", ông hãy làm trạng sư cho ông, cho địa vị xã hội của ông, và cho cái nghề không có môn bài của ông đã.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Tại sao tôi, dòng dõi gia thế, lại làm đến cái nghề... bất nhã này? Thưa ông, nếu tôi có thật không ra gì thì cái đó cũng chẳng phải lỗi tự tôi, tôi đã bị hại về hoàn cảnh xấu của xã hội. Nhưng tôi chỉ tự trách mình và vẫn nên tự trách xã hội. Sống ở cái xã hội cờ bạc, tôi chỉ biết rằng tôi đã là kẻ rong chơi bài bạc tự lúc thiểu thời. Tôi đã thua vì đỏ đen, tôi lại còn thua vì bịp nữa! Tôi đã phải xa gia đình vì phá tan cơ nghiệp, tôi đã khốn khổ, ê trệ - ê trệ nhiều phen lắm, hai ông ạ - cho nên chính ngày nay là ngày tôi đang trả thù cái bọn đã làm tôi hư hỏng, đã ngăn rào mọi đường công danh tiến thủ của tôi. Đỏ có là công lí không? Tôi tưởng: làm việc thiện dể đền ơn việc thiện, lấy việc ác để trả nghĩa việc ác, thế mới là biết sống ở đời... Nói cho cùng, tôi cũng vui vì đã làm, đang làm, sau này nữa cũng vẫn cứ làm cái nghề bất lương, cái nghề tôi cho là phải. Tôi chỉ buồn có một nỗi: không theo đuổi nổi sự nghiệp của ông cụ nhà tôi...</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Đến đây, ông ấm ngừng lại, có vẻ buồn rầu. Ông có ý chờ một câu phê phán. Tôi vội phải lộ sự tôi hiểu ý một cách kín đáo là đưa mắt nhìn cái ảnh lớn trong một khung vàng chói một ông cụ đi hia, mặc áo rồng, đội mũ cánh chuồn từ một chỗ trịnh trọng giữa bàn thờ nhìn một cách nghiêm khắc xuống lũ chúng tôi. Cử chỉ ấy có lẽ khiến ông ấm được một vài phút tự kiêu, nên lại vui lòng:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Vậy các ông coi cờ bạc là hạng thế nào? Tâm lí họ ra sao? Họ khôn hay họ dại đấy... Hai chủ khôn với dại trong sự bài bạc không có nghĩa nhất định. Nếu ông thua để vợ con phải nheo nhóc, thiên hạ sẽ đua nhau chê ông là dại thật dấy, nhưng nếu ông được tiền nghìn bạc vạn để tậu nhà tậu ruộng, thiên hạ họ lại xô nhau vỗ tay, ca tụng ông là khôn! Những anh cờ bạc toàn là những anh - xin lỗi các ông - những anh... \"khôn sặc máu mồm\" ra cả dấy, chứ các ông bảo họ dại cái nỗi gì? Tôi đây, tôi đã là một thằng dại mãi rồi mà tôi lại cứ muốn cầu cái khôn trong cái dại, nên mới phải tìm một cách \"bảo hiểm\" cho sự khôn!</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">ông ấm cả cười. Chúng tôi cũng cười. Sau ông tiếp nốt (từ đây trở đi, tài hùng biện của ông mỗi lúc một tăng):</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Thế các ông coi cái nghề của tôi bằng con mắt thản nhiên hay bằng con mắt khinh bỉ? Các ông nên biết: tuy là bịp, tôi vẫn không làm một việc nhỏ mọn gì là bất nghĩa cả. Trong đám bạc, người đời đã chỉ những muốn ăn thịt lẫn nhau cả, thì dù có bất nghĩa, tôi cũng chỉ bất nghĩa với một bọn bất nghĩa, chứ những người hiền lành không tham lam, không muốn ăn thịt ai cả, có khi nào đến nỗi bị chúng tôi hại đâu?</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Xem ý anh Vân lại được hài lòng, vui sướng hơn cả ông ấm B... vì \"bài cãi\" ấy. Rồi anh nối lời thuyết mãi, thuyết mãi... về cái nghĩa chính danh của sự bất nghĩa ở thời buổi vật chất, kim tiền này.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Buổi nói chuyện kéo đến lượt hò đun nước thứ ba. Chúng tôi phải đứng lên, xin cáo từ. Lởi nói cuối cùng của ông ấm B... là một câu phàn nàn về nạn kinh tế, về nỗi&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">mòng, két</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;mỗi ngày một hiếm, không được&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">mùa săn</em><span style=\"color: rgb(34, 34, 34);\">. Ông ta dặn chủng tôi nên rất để ý vào sự từn&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">đất</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;để làm&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">tiền</em><span style=\"color: rgb(34, 34, 34);\">.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Lời dặn ấy làm cho tôi phải nghĩ ngợi mãi? Vì sao? Vì nếu đối với ông ta, tôi không có mòng, sẽ bị coi là đồ vô tích sự, và sẽ mất dịp đi lại với ông về sau. Thành thử ở vào trường hợp ấy, tôi rất thèm thuồng ham muốn địa vị của anh Vân. Anh Vân tuy chưa cỏ gan dắt bịp đến bắt các anh em bạn thân, song anh ta cũng còn may vì có được một ông thân sinh ham mê hên bạc. Và mấy ông tóc bạc, bạn của ông cụ ấy nữa. Chỗ để đào tiền đã có sẵn, anh ta lại sẵn cả chỗ để ném tiền đi: những mẻng! Còn tôi, tuy cỏ nhiều bạn thân ham mê bài bạc thật, nhưng không nỡ dắt bịp đến bắt, lại không có nôi lấy một ông bố có máu mê ấy nên không biết liệu phải đối phó với ông ấm B... bằng cách nào...</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Tưởng chỉ còn cái kế cuối cùng là sự hẹn lần vậy. Có khi mình hẹn lần vì bất đắc dĩ mà người ta lại nhầm mình là hạng người cẩn thận, kín đáo, chắc chắn cũng không biết chừng. Vả lại, trước khi nhúng tay vào một việc có thể phạm tới danh dự của mình chút ít, dễ thường cứ bắt người ta nhắm mắt mà làm liều, không cho có ngày được rõ diện mạo, tímh tình nhân cách và mọi cử chỉ của từng viên chức trong \"bộ tham mưu\" ư?</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Cái ngày mà tôi được rõ mọi việc cũng không xa. May quá, nó đến trước khi tôi phải hẹn lần.</span></p><p class=\"ql-align-center\"><span style=\"color: rgb(34, 34, 34);\">° ° °</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Cái lịch trên tường phô ra hai con số: 30. Gian phòng gác ở phố Hàng Cá vào những ngày cuối tháng như ngày này, có cái vẻ nhộn nhịp của một toà tham mưu giữa lúc hai bên quân đương giao chiến với nhau thật kịch liệt. Vừa phần vì lẽ \"năng tới coi thường\", vừa phần hai bên đã coi nhau là thân mật, ông ấm để mặc chúng tôi mỗi anh ngồi chầu một chén nước nóng còn mình thì một tay đỡ lấy trán, tay kia bấm đốt, tỉnh lẩm bẩm như một thầy bói lấy số tử vi: \"... Hai đám xì một đám bất, một đám xóc đã và một đám tổ tôm. Đám xì ở Hàng Kèn đã có Ba Mỹ Ký với Bập đánh&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">giác</em><span style=\"color: rgb(34, 34, 34);\">... đám xì đường Cột Cờ đã có tay Bỉnh, tay Sính đánh đòn&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">Vân Nam</em><span style=\"color: rgb(34, 34, 34);\">... Còn đám bất phố Hàng Bông đã cỏ lão Cường hoặc đánh&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">lớp</em><span style=\"color: rgb(34, 34, 34);\">, hoặc đánh&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">mẫu tử</em><span style=\"color: rgb(34, 34, 34);\">. Xong đứt ba đám... Còn đám tổ tôm không biết nên tính thế nào? Chỗ chơi là chỗ đài các phong lưu mà phái Cửu Sần đi thì sợ lộ !... Ác quá, có cụ Ngọc là người trông có mẽ một chút thì lại mắc xuống Nam. Cẩu thật!... Còn mấy.anh lái nâu động mả, giữa lúc giời đất này cũng về khua xóc đĩa nữa, đã nằm chờ sẵn như lợn cả kia thì biết cắt ai đi chọc tiết bây giờ?... Chỉ có mình, mình là tay khả dĩ đối thủ được với chúng thôi, thì mình lại phải cái tội đã&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">loã lồ</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;quá.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Mấy tiếng gót giày khẽ nện vào bậc thang gác báo trước cho một người còn trẻ tuổi, ăn mặc ra một tay trong phái bồi, bếp, rón rén bước lên. Thấy chúng tôi lạ mặt, người ấy có vẻ ngần ngại, chỉ đưa mắt hỏi ông ấm chứ không nói gì. Ông này làm ngay một câu:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Thế nào?... Được, cứ tự nhiên, chỗ anh em cả.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Người trẻ tuổi kia lộ ngay cái vẻ sung sướng ra như đang có một gánh nặng trên vai mà đến lúc vừa hạ được nó xuống đất. Nhưng đôi lông mày vẫn cau:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Hỏng mất cụ ạ!...</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Thế nào mà đến nỗi hỏng? Thu xếp thế mà lại hỏng thì hỏng thế nào?</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Tôi đã dò lão ta rất kĩ lưỡng. Thằng cha ấy nó biết rõ lối đánh&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">giác</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;từ bao giờ ấy mất rồi. Tôi gợi chuyện thì nó đã nói toạc móng heo ra, những là nó biết hết tất cả các lối&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">giác mùi</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;hay giác bóng cũng vậy, và chỉ có những đồ mù thì mới không biết cách khám thấy dấu, chứ cứ để nghiêng quân bài dưới ánh sáng đèn một tí thì anh nào đến thong manh dở cũng phải biết ngay! Lại còn nỗi khó khăn này: muốn bắt lão ta, phải đến tận nhà thằng cháu lão ta, chứ lão nhất định không đi chơi chỗ nào lạ. Tôi phải tìm cách \"bỏ nhỏ\" với thằng cháu lão và việc ấy cũng ổn rồi. Vậy thì cụ xếp cho một người cản nữa để tôi đánh&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">Vân Nam</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;vậy.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Ông ấm ngần ngại:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Khốn nỗi anh mà đánh đòn&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">Vân Nam</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;thì tôi không lấy gì làm chắc lắm. Có được anh Ba Mỹ Ký thì lại trót hẹn mất với đám ở Hàng Kèn rồi. Hay là tối hôm nay, ta hãy đánh&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">siệng</em><span style=\"color: rgb(34, 34, 34);\">, làng xoàng độ năm hào một cho qua buổi để mơn lão ấy đến trưa mai hoặc tối mai, tôi cho gọi Ba Mỹ Ký đi với anh đến thì thật là cứ \"nhét đất thó vào lỗ mũi nó mà lấy tiền...\" !</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Không được ! Lão ấy nó đang cao hứng, nếu để đến tận trưa mai hoặc tối mai thì từ buổi sáng sớm nó đã có thể dậy để đi cân sâm cho con nó rồi, mình còn hòng bắt nó lấy cái gì nữa?</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Thế đích xác là nó có độ bao nhiêu?</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Độ chừng sáu&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">công</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;2&nbsp;tất cả. Cụ phải tỉnh ngay cho chứ mà...</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Thôi được, cứ về đi rồi độ sáu giờ chiều lại đây lấy nốt người&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">cản</em><span style=\"color: rgb(34, 34, 34);\">. Để tôi có thời giờ, nghĩ thật kĩ xem sao.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Người trẻ tuổi ấy trước khi quay gót bước xuống thang còn liếc mắt nhìn trộm chủng tôi lần cuối cùng, dáng dấp vẫn lộ vẻ ngượng. Đến bây giờ, ông ấm mới giới thiệu:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Đấy, một đàn em của tôi đẩy. Trước làm thầy kí cho hiệu buôn lớn, chữ nghĩa kể cũng khá, sau vì kinh tế nên bị loại, nay phải tạm sinh nhai về nghề này. Vì phải giao thiệp với hạng&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">trếch</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;để săn&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">mòng, két</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;trong đám bồi, bếp nên tôi bắt anh ta ăn mặc đúng lối&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">trếch</em><span style=\"color: rgb(34, 34, 34);\">. Nếu hắn diện Âu phục vào thì các ông phải biết... Nói tiếng Tây nhanh làu làu. Chỉ trông mặt mà bắt hình dong thì nhầm to.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Anh Vân khen:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Phải... gớm mưu trí của ngài kể cũng đáng sợ thật. Mà thế thì ra đàn em của ông toàn là những tay đáo để, ra phết cả, \"chơi được\" cả...</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Thì đã hẳn !... Vào nghề này mà hiền lành thì làm ăn ra sao? Hai ông nên biết rằng không kể một số khá đông người, nửa là đồng nghiệp, nửa là đàn em của tôi, tôi còn dưới quyền sai phái độ mươi tay nữa, vào hạng nào cũng có, một người ít ra cũng sở trường về một vài ngón bịp và anh nào cũng có đặc sắc riêng. Nhất là về những cách thay hình, đổi dạng của chúng tôi... tôi cam đoan rằng chúng tôi không thua những nhân viên của sở Liêm phóng&nbsp;3. Thí dụ: ông là&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">quých</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;chẳng hạn. Ông là một nhà buôn, ông sẽ gặp một người trông thật là chủ hiệu ngồi hầu bài. Ông là một công tử nhà giàu, tôi sẽ để ông ngồi với một chàng trông thật ra lối con nhà phá của.... và chưa chắc đã không có một vài cô gái mới&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">ngồi cản</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;đâu? Còn nếu ông là một viên chánh tổng, lí trưởng nào, tôi sẽ dắt cho một thầy ngăm ngăm da trâu, trông rõ \"Đình Dù đặc\". Hoặc nếu ông là một chú&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">trếch</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;sộp, tất nhiên phải có một bác tài răng vàng, đội cái&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">cát-két</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;hay một ông còn nguyên búi tóc lại mặc áo cánh cổ cứng ngồi hầu ông chứ... biết làm thế nào?</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Ba chúng tôi vừa bật cười ầm lên, bỗng phải hãm ngay luồng điện khoái lạc ấy lập tức. Lại một hồi gót giày nện rõ mạnh vào thang. Chỉ nghe tiếng động mạnh gớm mạnh ghê như thế, ai cũng phải đoán: người sắp lên ấy sẽ là một người Pháp. Nhưng không phải, chỉ là một người Nhật, vì người đang tiến đến chúng tôi để giơ hai tay ra bắt rất ân cần ấy đã có cả cái thân thể một ông khổng lồ lẫn bộ quần áo Tây phương, lại đèo thêm bộ mặt một dân Nhật Bản. Giá ông ta thay cái mũ&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">cát-két</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;da hổ ấy đi để chụp vào đầu một cái mũ lưỡi trai có cái vòng lon kim tuyến chẳng hạn thì, sẵn có cái áo tơi bằng da màu cánh gián đã ngắn cộc lại thêm đai nịt rõ chặt chẽ ấy, đi nghênh ngang ngoài đường, ông ta có thể bắt nhiều người nhầm mình là một phi hành gia. Nước da còn hồng hào với một ít râu để lối Hoa Kỳ&nbsp;4&nbsp;của ông tỏ ra rằng ông chưa quá 40 tuổi.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Sau khi chủ, khách đã phân vị đâu đấy cả, ông ấm B... quay lại nói ngay:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Xin giới thiệu để hai ông được biết: ông này quý danh là ông Cả Ủn, người giữ cái két lớn nhất cho&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">làng b</em><span style=\"color: rgb(34, 34, 34);\">... chúng ta.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Ông Ủn cả cười và thêm:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Nhưng phải cái két thủng đáy, hai ông ạ.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Lời giới thiệu sỗ sàng của ông ấm B... đã đánh tan mọi sự giữ gìn của những người mới gặp nhau lần thứ nhất.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Cho nên mới có những câu hỏi, đáp tự do sau đây:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Ngọc đi bao giờ mới về?</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Chưa biết đích xác được.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Cỏ phải chính bác sai hắn đến lấy&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">thiếc</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;đằng tôi không?</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Phải... nhưng tôi chỉ mới bảo hắn đến lần này là lần đầu.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Thế mà hắn đến lần này làlần thứ hai!</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Lần thứ hai?</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Phải !... Hay lần trước là hắn bịa chuyện ra chứ không do bác bảo?</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Thế lấy bao nhiêu?</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Bốn chục.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Trả chưa?</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Rồi.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Thế là hẳn lấy để đi \"ăn mảnh\" đấy chứ không phải do tôi bảo đâu. Thế hôm vừa rồi đưa hắn bao nhiêu, bác thử hỏi xem có đúng sổ tiền mà tôi bảo hắn đến chạy đằng bác không nào...</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Hình như nhà tôi đưa hắn 50&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">của</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;thì phải. Lần sau trở đi, chính bác nên thân hành lại mà lấy hoặc không tiện đến, bác cho mấy chữ lại vậy... chứ tôi không tin các \"ông tướng\" ấy đâu. Thế có phải đúng bác bảo hắn lấy 50&nbsp;</span><em style=\"color: rgb(34, 34, 34);\">của</em><span style=\"color: rgb(34, 34, 34);\">&nbsp;để đi Nam không?</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Phải rồi... Được, lần sau có chữ tôi gửi lại, bác hãy đưa tiền. Và dặn cả bác gái như thế hộ tôi một thể.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">--------------------------------</span></p><p class=\"ql-align-right\"><span style=\"color: rgb(34, 34, 34);\">1</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Hậu bổ: chức quan sắp được bổ làm tri huyện. Tri châu: quan cai trị một châu ở miền núi, tương đương một huyện ở miền xuôi.</span></p><p class=\"ql-align-right\"><span style=\"color: rgb(34, 34, 34);\">2</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Tờ bạc năm đồng in hình một con công.</span></p><p class=\"ql-align-right\"><span style=\"color: rgb(34, 34, 34);\">3</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Thường gọi là Sở mật thám.</span></p><p class=\"ql-align-right\"><span style=\"color: rgb(34, 34, 34);\">4</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Tức là hàng ria con kiến.</span></p><p>&nbsp;</p><p>&nbsp;</p>', 1, 5, '', 2965, 0, 2, '2025-09-10 11:48:36');
INSERT INTO `Chapters` (`chapter_id`, `story_id`, `title`, `content`, `is_vip`, `price`, `chap_ads_content`, `word_count`, `view_count`, `chap_number`, `created_at`) VALUES
(19, 21, 'Đêm ấy, tại hàng cơm', '<p>Chương 1: Đêm ấy, tại hàng cơm</p><p>&nbsp;</p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Tôi không cần nói rõ hàng cơm nào, ở phố nào làm gì. Các ngài chỉ cần biết rằng một hàng cơm như nghìn vạn hàng cơm khác, nghĩa là khi ta mới bước chân vào thì bổn phận ta là lập tức thấy buồn nôn buồn ọe. Nó là mùi cá mè, mùi thịt trâu, thịt lợn thiu, mùi lòng lợn, lòng bò, mùi me chua, mùi dưa khú... Thôi thì đủ một trăm nghìn thứ mùi khó chịu mà lạ nhất là nó không hề bận đến hai lỗ mũi của bà chủ luôn luôn nắm trong tay cái quạt nan, cởi trần trùng trục và thỉnh thoảng lại cao hứng vén quần lên đến bẹn mà gãi sồn sột, tự nhiên như đàn ông.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Lúc ấy đã khuya lắm rồi.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Một mụ già làm nghề đưa người đưa tôi đến chỗ này mà bảo bà chủ:\" Bà cho anh ấy ngủ đây vài tối, bao giờ anh ấy có việc làm, tôi xin đưa tiền trọ\", thì bà chủ chẳng buồn nhìn tôi nữa, đập một con muỗi ở cổ đến bốp một cái, gãi vung lên một hồi nữa rồi mới chọc chọc cái giá quạt về phía sau lưng, ra ý bảo tôi cứ việc vào trong kia mà nằm. Trước khi ra đi, mụ già lại dặn tôi:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Ngày mai nhớ ra ngã ba cho sớm đấy!</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Vâng ạ!</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Tôi đáp xong, rón rén lần vào phía trong. Thật vậy chân tôi chưa bao giờ phải dẫm lên một lớp bùn quánh và nhớp nháp đến như thế. Đến chỗ mấy cái giường cách nhau mỗi giường một manh cót thì tôi không biết nên đặt lưng vào giường nào, vì giường nào cũng đã thấy đầy những người là người, nằm ngổn nằm ngang...Tôi đương bỡ ngỡ thì thấy bà chủ hàng cơm quát:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Thằng Hai đâu! Bảo nó lên sân gác, chỗ những đứa ở ấy mà nằm!</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Rồi thì một anh chàng chạy ra dắt tôi qua một cái sân, đến một cái thang tre mà bảo:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Lên đây.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Tôi theo lời, leo thang. Lên đến nơi thì đó là một gian gác cũng khá rộng. Trên mặt sàn chỉ có mấy cái chiếu, mà tường thì vàng ệch những khói ám, từ cái bếp gần ngay đó đưa ra.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Bọn cơm thầy cơm cô nằm ngổn ngang như lợn cả, bọn đực nằm phía bên kia, bọn cái nằm phía bên này. Bốn thằng nhỏ bằng trạc tuổi tôi với ba con sen, một con độ lên mười, một con 15, còn một con nữa trông đã đứng tuổi. Trong khi hai đứa trẻ tuổi nằm hớ hênh vô ý thì con đứng tuổi khép nép vào một xó tường, khẽ nâng cái quạt nhìn tôi.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Tôi bèn lần đến phía tụi con trai, ngồi xuống một góc chiếu. Tôi nom trước nom sau không thấy người của hàng cơm mới mạn phép khêu to ngọn đèn hoa kỳ. Rồi tôi lấy cái ống diêm ra dắt thuốc lào vào cái lỗ thủng, để lên miệng...</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Chợt có đứa nói:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Tội gì mà hút thế cho nóng! Với lấy cái điếu cầy ở kia kìa.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Tôi quay cổ lại nhìn thì thằng vừa nói đã ngồi nhỏm lên chạy ra tìm điếu. Sau điếu thuốc lào tôi cho nó hút che tàn thì chúng tôi đã là quen thuộc nhau hẳn hoi. Nó hỏi tôi:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Trông đằng ấy có vẻ thạo lắm. Chắc đã ở tỉnh lâu rồi.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Tôi ngửa cổ ra sau lưng lấy oai mà nạt rằng:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- A, cái đó thì đã hẳn!</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Chỉ một câu nói đó khiến nó đủ sợ tôi. Vì rằng từ đó trở đi nó luôn luôn gọi tôi là anh để cho tôi cứ tự nhiên gọi nó là mày.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Còn mày thì bỡ ngỡ lắm. Mày mới ở nhà quê ra có phải không?</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Vâng!</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Mày đã đi làm lần nào chưa?</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Đã ngót một tháng ở một nhà phố B...rồi không ở được phải xin ra.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Làm sao?</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Nó chửi suốt ngày.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Mày thì chưa đủ tư cách nếm cơm đâu! Đừng đứng núi này trông núi nọ mà ông cho có phen chết rã họng!</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Mãi đến lúc ấy vẫn còn thấy tiếng người làm chạy ra chạy vào rộn rịp cả hàng cơm. Bên ngoài người ta đã kỳ cạch lên cửa, vậy mà bên trong hình như lúc ấy người ta mới bắt đầu xào xáo... Tiếng bát đũa chạm nhau lạch cạch, tiếng nước giội xuống sân ào ào, tiếng mỡ nhảy trong xanh ran cả tai. Có lẽ những gia nhân của hàng cơm không biết phân biệt đêm ngày. Một thằng hát vang lên cho cả bọn nói bông nói đùa nhau khỏi buồn ngủ.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Tôi lại bảo cái thằng ấy:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Cứ việc bịt tai lại, chủ nó chửi thì chủ nó nghe, biết không? Cốt sao giữ lấy việc làm khỏi chết đói là phúc!</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Nó chớp mắt sợ hãi rồi sẽ cãi:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Bốn hào một tháng mà cấm bữa nào được ăn no, anh bảo một tháng như thế thì \"nước mẹ\" gì?</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Nhưng mà tôi, tôi cần gì lời cãi của nó. Tôi hãy nói khoác cho nó sợ tôi đã.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Bao giờ như anh mày đây này, lúc đó hãy đứng núi này trông núi kia biết chưa?</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Nó họa theo:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Phải, như anh thì tất nhiên đã thạo lắm.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Chứ lại còn bàn, ra máy chỉ hét một cái là lấy được hai thùng nước. Mà món ăn nào nấu cũng thạo, cả món ăn ta món ăn tây...</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Thế sao anh cũng mất việc?</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Tôi trừng mắt lườm nó mà rằng:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Mất việc à? Hai đồng rưỡi lương tháng rồi, ông đòi thêm năm hào nữa mà không thêm thì ông bỏ đấy!</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Nó lè lưỡi tỏ ý kính phục tôi lắm. Mà ngần ấy điều chỉ cốt để con bé nằm nhìn trộm tôi phải cho tôi là một kiện tướng trong bọn cơm thầy cơm cô. Tôi đã có cơ thành công trong cuộc \"giương vây\", vì từ lúc này trở đi, con bé cứ mải nhìn tôi, ngắm nghía tôi, \"đánh giá\" tôi chứ không ngủ.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Nói khoác mãi cũng thất sách, tôi bèn hỏi:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Thế đằng ấy thích làm cho những nhà thế nào?</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Nó đáp:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Khốn nạn, nào tôi có tài giỏi gì mà còn dám nếm cơm ai! Tôi chỉ cầu vào một cửa đãi mình cho vừa phải, đừng bắt mình làm quá sức, đừng đánh mình, chửi mình. Mà cái nhà tôi vừa bỏ thì, khốn nạn, nó năm cha ba mẹ quá, ai cũng đánh chửi được mình! Người này sai chưa làm xong việc này, người khác đã lại ới. Thành ra mình là cái thân ba vạ.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Nó kêu chưa bao giờ nó thấy một nhà nào lại tồi tệ như thế cả. Thật vậy, đến nó là kẻ phải mang thân đi ở mà nghĩ đến nhà chủ là thấy phải khinh. Nó chỉ là con nhà bố cu mẹ đĩ thôi cũng không đến nỗi khốn nạn bao giờ. Thật vậy, nếu những lời nó nói là thật</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Sau khi nghe chuyện, tôi phải xếp đặt lại một cảnh gia đình không ai tưởng tượng là có được, ở giữa đất văn vật ngàn năm...</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Nhà có sáu người, ông bố với bà mẹ già, người con giai cả đi làm tùy phái cho một công sở, cộng thêm hai cô con gái...</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Sáu người cùng chung máu mủ hoặc là vợ chồng mà mỗi bữa mỗi người đều vào bếp thổi một niêu cơm. Lúc ăn người ta tuy ngồi cùng với nhau, song ai cũng có thức ăn riêng của người ấy. Đại khái ông bố đã có đĩa chả, bà mẹ đĩa đậu rán, con trai với con dâu: một đĩa xào, các con gái: bát dưa, bát canh... Người ta tuy cùng ngồi ăn một mâm chung, nếu ai bị sự cám dỗ mà đưa đũa xâm phạm đến món ăn của người khác thì tức khắc sẽ có cái lườm đến nổ trời.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Ấy là cái cảnh của nhà ấy bằng vài nét vẽ phác.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Vậy thì một bữa, khi nàng dâu để phần chồng một đĩa chả rươi, chẳng may ông bố chồng ăn cơm trước đã đụng đũa vào.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Đi làm về, ông con trai mở lồng bàn thấy món mỹ vị đã bị thất tiết, bèn quát rầm lên:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Đứa nào ăn của ông đây? Ông đi làm khó nhọc mà ông chưa ăn, đứa nào dám ăn trước ông, mau mau khai ra!</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Ông bố chạy lại dịu giọng đáp:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Thưa cậu, tôi đấy ạ. Tôi tưởng chị ấy có rươi mới thì làm cho tôi nên tôi nhầm, chót nhỡ ăn phải mấy miếng...</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Thế thì các ngài có đoán được là ông con trai nói lại như thế nào không? Muốn để các ngài đoán dễ hơn, tôi xin thưa, thằng nhỏ kia đã nói với tôi: ông bố thuê gác trong, ông con thuê gác ngoài.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Thôi, các ngài đoán chẳng ra đâu, vì Victor Hugo cũng chưa hề tưởng tượng được ra một kẻ khốn nạn đến như thế.</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Ông con đã nói cho ông bố nghe một câu thâm thúy như thế này:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Nhầm,... thằng thuê gác trong, thằng thuê gác ngoài, mà vợ người ta để phần cơm người ta, mà lại nhầm! Nhầm kể cũng lạ!</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Rồi thằng nhỏ khí khái kết luận rằng:</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">- Tớ nghĩ đi ở mà được chủ hay cũng đẹp mặt, còn đi ở phải những chủ như thế nhục lắm!</span></p><p class=\"ql-align-justify\"><span style=\"color: rgb(34, 34, 34);\">Tôi gật gù đồng ý với nó rồi lại mất thêm cho nó một điếu thuốc, một que diêm, nhưng lãi ở chỗ được cái cười giòn của con bé nằm ở góc tường. Cái cười kia xui tôi có gan cầm đèn soi vào tận mặt nó.</span></p><p>&nbsp;</p>', 1, 5, '', 1637, 0, 1, '2025-09-10 11:52:21');

-- --------------------------------------------------------

--
-- Table structure for table `ForumComments`
--

CREATE TABLE `ForumComments` (
  `comment_id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `total_likes` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ForumLikes`
--

CREATE TABLE `ForumLikes` (
  `like_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ForumPosts`
--

CREATE TABLE `ForumPosts` (
  `post_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `story_id` int(11) DEFAULT NULL,
  `genre_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `topic_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `hashtag` varchar(255) DEFAULT '#dongvan'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ForumPosts`
--

INSERT INTO `ForumPosts` (`post_id`, `user_id`, `story_id`, `genre_id`, `title`, `content`, `topic_id`, `created_at`, `hashtag`) VALUES
(13, 10, NULL, NULL, 'Đại Đạo Triều Thiên - Lý Miêu Nị cùng Cửu', '<p>Đây cũng không hẳn là review, nhưng em muốn chia sẻ sự có duyên của mình với bộ truyện này vừa với t.ư cách là dịch giả vừa với t.ư cách độc giả. Bộ truyện hay, ko cuốn theo kiểu hừng hực bằng các tình tiết hút hồn ( như 1 bộ trọng sinh về chủ đề forex như em đã từng dịch để đọc ), với tình tiết nhẹ nhàng nhưng đủ để người đọc đọc từ chương này đến chương khác. Nó mang lại cảm giác như hồi đọc Đại niết bàn ( Trùng Nhiên thì không thế ). </p><p>Truyện không dài không ngắn với 1.5 triệu chữ ( Trung ) nên đảm bảo anh em sẽ có truyện đọc trong tầm 3 tháng ( cái này phụ thuộc vào tốc độ edit, nếu em có nhiều thời gian để đọc thì chắc chỉ 1 tháng ). Còn sau đây là tâm sự của ông dịch giả là em và ông tác giả ở tận bên Tàu&nbsp;Đang biên tập thì em tình cờ thấy mấy dòng tự sự của tác giả lẫn vào, nên tiện tay biên luôn để anh em đọc. Bộ này, em cảm thấy thực sự rất có duyên. Đây là một bộ truyện em dịch hoàn toàn ngẫu hứng, cũng là bộ thứ ba em dịch, mà em cũng là tay ngang. Biết tiếng Trung hơn chục năm nhưng cũng từng ấy năm “mù chữ,” nên việc dịch toàn bộ đều nhờ vào khả năng code và quá trình training AI.  </p><p>Cũng như tác giả, đây cũng là bộ đầu tiên em dịch hoàn chỉnh, rất phù hợp để em dùng đào tạo AI. Bộ truyện các anh em đang đọc có lẽ là bản dịch thứ 15, 16 của con AI mà em đã huấn luyện. Việc dịch này không phải vì kiếm tiền, mà chỉ đơn giản là em muốn tạo ra một công cụ dịch những dòng truyện đô thị thật hay, để em và mọi người có thêm truyện để đọc.  Thật sự rất có duyên. Em cũng mong sẽ \"vá víu\" được chút vía của tác giả để nhận được sự ủng hộ của anh em độc giả. Rất cảm ơn mọi người đã quan tâm và ghé qua.</p>', 2, '2025-09-10 11:58:07', '#dongvan'),
(14, 10, NULL, NULL, 'Tu Tiên Nông Dân - Hành trình từ phàm nhân', '<p>Đây là một bộ phim hoạt hình tu tiên (donghua Trung Quốc) kể về một người nông dân khiêm nhường trở thành một tu sĩ mạnh mẽ. Mấy bài review trên sub này thường là về sách hoặc sách nói, nhưng mình đã cày hết 124 tập phim hoạt hình này và cực kỳ recommend cho mấy bạn thích thể loại tiên hiệp thăng cấp.</p><p>Nhân vật là điểm nhấn chính của phim, nhân vật chính Hàn Lập có tài năng bình thường nhưng lại dùng trí thông minh và sự xảo quyệt để đánh bại những đối thủ mạnh hơn. Anh ấy là kiểu người tránh đánh nhau, nhưng khi đã đánh thì dùng đủ mọi chiêu trò, mưu kế, và cả những \"chiêu bẩn\" để thắng. Hàn Lập khá dễ gần, không phải là người chính trực tuyệt đối cũng chẳng phải là kẻ xấu xa, chỉ là cố gắng sống sót và làm điều tốt khi có thể. Tuy nhiên mình hơi bực vì anh ấy né tránh chuyện tình cảm và từ chối tất cả những người thầm thương trộm nhớ. Anh ấy hoàn toàn trái ngược với kiểu nhân vật chính trong mấy bộ harem.</p><p>Về phần thăng cấp, mình rất thích sự liền mạch. Trừ vài ngoại lệ, mỗi công cụ hoặc kỹ thuật Hàn Lập sử dụng đều là thứ anh ấy đã có được trên phim ở những cuộc phiêu lưu trước đó. Và đến những tập cuối, anh ấy có cả một kho đồ trong túi đồ của mình, nhiều đến nỗi cả yêu quái lâu năm cũng phải sốc trước sự khéo léo của anh chàng này. Quá trình thăng cấp nhìn chung rất xứng đáng, ngoại trừ một món đồ cheat anh ấy tìm được từ sớm, nhưng nó không hữu ích trong chiến đấu và phim thường cho thấy sự khôn khéo mới là lý do thành công của anh ấy chứ không phải nhờ cheat.</p><p>Tuy nhiên, dù cẩn thận thế nào, Hàn Lập vẫn là nam châm hút cả may mắn và xui xẻo. Dù cố gắng hết sức, anh ấy liên tục rơi vào những tình huống cực kỳ nguy hiểm nhưng lại có phần thưởng rất hậu hĩnh. Với cách xây dựng thế giới khá nhất quán và kỹ lưỡng, mình sẽ không ngạc nhiên nếu sau này họ tiết lộ rằng trời đất đang can thiệp vào anh ấy.</p><p>Về mặt hoạt hình, mình khá ấn tượng với những chi tiết nhỏ trên biểu cảm khuôn mặt và các cảnh đánh nhau của nhân vật. Phong cách hoạt hình 3D ban đầu hơi lạ nhưng càng xem càng thấy hay, và màu sắc tươi sáng cùng bối cảnh đẹp mắt đã tạo nên những cảnh quay tuyệt vời. Nhóm làm phim đã rất tâm huyết khi thể hiện những chi tiết như chuyển động tinh tế của mắt khi nhân vật đang suy nghĩ hoặc những biểu cảm rất nhỏ khi họ nảy ra một ý tưởng thông minh. Trong khi đó, các cảnh chiến đấu nhìn chung mạch lạc và có sự liên tục từ cảnh này sang cảnh khác, ngay cả khi hoạt hình nhân vật chiến đấu nhanh đến mức khó theo dõi. Bộ phim này rõ ràng là một dự án đam mê.</p>', 3, '2025-09-10 12:02:04', '#dongvan'),
(15, 10, NULL, NULL, '10 truyện trinh thám mình từng đọc', '<p><span style=\"color: rgb(0, 29, 53);\">Top 5 truyện trinh thám hay nhất thế giới bao gồm Bộ truyện&nbsp;Sherlock Holmes của Arthur Conan Doyle, Án mạng trên chuyến tàu tốc hành phương Đông và Vụ án mạng trên sông Nile của Agatha Christie, Phía sau nghi can X của Higashino Keigo, và Mật mã Da Vinci của Dan Brown.&nbsp;Các tác phẩm này nổi tiếng nhờ cốt truyện hấp dẫn, khả năng suy luận của thám tử, những bí ẩn bất ngờ và sự phát triển tâm lý nhân vật sâu sắc.&nbsp;</span></p>', 1, '2025-09-10 12:05:33', '#dongvan');

-- --------------------------------------------------------

--
-- Table structure for table `Genres`
--

CREATE TABLE `Genres` (
  `genre_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Genres`
--

INSERT INTO `Genres` (`genre_id`, `name`, `description`) VALUES
(1, 'Linh dị', 'Truyện tập trung vào các mối quan hệ tình cảm lãng mạn, với những diễn biến tâm lý, tình tiết ngọt ngào hoặc trắc trở của các nhân vật chính.'),
(2, 'Trinh thám', 'Một loại hình văn học tập trung vào việc giải quyết vụ án bí ẩn, tội phạm thông qua quá trình điều tra, suy luận logic của nhân vật chính, thường là thám tử, để vạch trần chân tướng và hung thủ.'),
(3, 'Lịch sử', 'Truyện lịch sử là loại truyện lấy đề tài lịch sử (lịch sử quốc gia, dân tộc, dòng họ, danh nhân ...) làm nội dung chính. Truyện lịch sử thường làm sống dậy bức tranh sinh động về một thời đã qua và mang lạinhững nhận thức mới mẻ hay bài học sâu sắc.'),
(4, 'Ngôn tình', 'Truyện ngôn tình là thể loại tiểu thuyết lãng mạn bắt nguồn từ Trung Quốc, tập trung vào chuyện tình yêu đôi lứa giữa nam và nữ, với văn phong giàu cảm xúc và nhiều tình tiết lãng mạn, đôi khi kịch tính nhưng thường có kết thúc tốt đẹp. Từ \"ngôn tình\" ghép lại từ \"ngôn\" (lời nói, ngôn ngữ) và \"tình\" (tình yêu, tình cảm), phản ánh bản chất của thể loại là những câu chuyện xoay quanh tình yêu. '),
(5, 'Truyện ngắn', 'Truyện ngắn là một thể loại văn học. Nó thường là các câu chuyện kể bằng văn xuôi và có xu hướng ngắn gọn, súc tích và hàm nghĩa hơn các câu truyện dài như tiểu thuyết. Thông thường truyện ngắn có độ dài chỉ từ vài dòng đến vài chục trang, trong khi đó tiểu thuyết rất khó dừng lại ở con số đó.'),
(6, 'Thơ', 'Truyện thơ là một thể loại văn học độc đáo, kết hợp giữa ngôn ngữ thơ và yếu tố truyện. Nó tạo điểm nhấn bằng việc sử dụng các thiết kế ngôn ngữ và cấu trúc thơ để kể một câu chuyện, thể hiện một ý tưởng hoặc truyền đạt một thông điệp.'),
(7, 'Huyền ảo', 'Thể loại truyện huyền ảo, hay Chủ nghĩa Hiện thực Huyền ảo (Magical Realism), là một thể loại văn học kết hợp các yếu tố kỳ ảo, siêu nhiên vào một bối cảnh hoàn toàn đời thực, với giọng kể tự nhiên và không giải thích về những điều kỳ lạ xảy ra. Điểm khác biệt chính so với thể loại kỳ ảo thông thường là chủ nghĩa hiện thực huyền ảo lấy bối cảnh thế giới thực, trong khi thể loại kỳ ảo thường diễn ra trong những thế giới hư cấu. '),
(8, 'Viễn tưởng', 'Thể loại truyện viễn tưởng là những tác phẩm hư cấu, thường là truyện hoặc tiểu thuyết, sử dụng các yếu tố khoa học và công nghệ tiên tiến (thực tế hoặc tưởng tượng) để xây dựng hình tượng và cốt truyện, khám phá các viễn cảnh, công nghệ hoặc hậu quả trong tương lai hoặc các thế giới giả định khác. Nó bao gồm các chủ đề như du hành vũ trụ, du hành thời gian, robot, trí tuệ nhân tạo, sự sống ngoài hành tinh, và thao tác di truyền. '),
(9, 'Cổ đại', 'Thể loại truyện \"cổ đại\" thường ám chỉ các câu chuyện thuộc văn học dân gian như truyện cổ tích, thần thoại, và truyền thuyết, được truyền miệng qua nhiều thế hệ trong quá khứ xa xưa, hoặc các tác phẩm văn học hiện đại mô phỏng bối cảnh và văn hóa của các thời đại phong kiến, đế quốc. Mục đích của những truyện này là giải thích thế giới, phản ánh ước mơ về công lý và sự tốt đẹp, hoặc ca ngợi những nhân vật lịch sử anh hùng.'),
(10, 'Hiện thực', 'Thể loại truyện hiện thực là một phương pháp sáng tác và trào lưu văn học nhằm phản ánh chân thực đời sống xã hội, tập trung vào việc miêu tả chi tiết, cụ thể về con người, sự kiện và môi trường xung quanh. Nét đặc trưng của thể loại này là tính điển hình hóa nhân vật, xây dựng nhân vật phản ánh rõ nét đặc điểm chung của một nhóm người hoặc giai cấp, và thường mang tinh thần phê phán, phân tích các khía cạnh tiêu cực của xã hội đương thời như bất công, thối nát. '),
(11, 'Tản văn', 'Tản văn là loại văn xuôi ngắn gọn, hàm súc, có thể trữ tình hoặc không, tự sự, nghị luận, miêu tả phong cảnh, khắc họa nhân vật. Lối thể hiện đời sống của tản văn mang tính chất chấm phá, không nhất thiết đòi hỏi có cốt truyện phức tạp, nhân vật hoàn chỉnh nhưng có cấu trúc độc đáo, có giọng điệu, cốt cách cá nhân.');

-- --------------------------------------------------------

--
-- Table structure for table `ReadLogs`
--

CREATE TABLE `ReadLogs` (
  `read_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `chapter_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Stories`
--

CREATE TABLE `Stories` (
  `story_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `author_id` int(11) DEFAULT NULL,
  `urlImg` varchar(500) DEFAULT NULL,
  `link_forum` varchar(255) DEFAULT NULL,
  `genres_id` int(10) DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Stories`
--

INSERT INTO `Stories` (`story_id`, `title`, `description`, `author_id`, `urlImg`, `link_forum`, `genres_id`, `create_at`) VALUES
(20, 'Cạm Bẫy Người', 'Cạm bẫy người\" là một tác phẩm phóng sự của nhà văn Vũ Trọng Phụng, ra đời năm 1933, nhằm vạch trần và tố cáo tệ nạn cờ bạc bịp lan tràn ở Hà Nội thời bấy giờ. Để thực hiện tác phẩm, Vũ Trọng Phụng đã trực tiếp thâm nhập các sòng bạc, mô tả chi tiết cách thức hoạt động của \"làng bịp\", chân dung của những kẻ cầm đầu và những bi kịch mà họ gây ra cho các gia đình \"tín đồ tôn giáo đỏ đen', 10, 'https://res.cloudinary.com/djr4f7ceu/image/upload/v1757504771/stories_covers/ogwdojbwe0glf4n0rffp.jpg', '', 1, '2025-09-10 11:46:12'),
(21, 'Cơm thầy cơm cô', '\"Cơm thầy cơm cô\" là một thiên phóng sự của Vũ Trọng Phụng mô tả thực trạng di dân từ nông thôn ra thành thị dưới thời Pháp thuộc. Tác phẩm phơi bày cuộc sống khổ cực, bị bóc lột, lạm dụng và tệ nạn xã hội mà những người lao động nghèo gặp phải khi tìm đến \"ánh sáng kinh thành\". Thiên phóng sự này được đánh giá là một bức tranh chân thực, sâu sắc về xã hội đương thời, thể hiện tài năng của \"ông vua phóng sự đất Bắc\". ', 10, 'https://res.cloudinary.com/djr4f7ceu/image/upload/v1757505108/stories_covers/r3dxz4bwg1ybvajyqc3u.jpg', '', 1, '2025-09-10 11:51:49'),
(22, 'Giông tố', 'Truyện \"Giông Tố\" của Vũ Trọng Phụng là bức tranh hiện thực phản ánh xã hội Việt Nam những năm 1930, với sự thối nát, giả tạo của tầng lớp thượng lưu và sự bế tắc của tầng lớp dưới đáy xã hội. Tác phẩm phơi bày sự suy đồi đạo đức, sự tha hóa của con người qua các nhân vật tiêu biểu như Nghị Hách, Tú Anh, Long, và các nhân vật ở tầng lớp thấp như dân nghèo, kỹ nữ, khi mà mỗi người đều là nạn nhân hoặc thủ phạm trong một xã hội đầy rẫy bất công. ', 10, 'https://res.cloudinary.com/djr4f7ceu/image/upload/v1757505224/stories_covers/arjju96myeemivjexsug.jpg', '', 1, '2025-09-10 11:53:44');

-- --------------------------------------------------------

--
-- Table structure for table `StoryComments`
--

CREATE TABLE `StoryComments` (
  `comment_id` int(11) NOT NULL,
  `story_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `like` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `StoryComments`
--

INSERT INTO `StoryComments` (`comment_id`, `story_id`, `user_id`, `content`, `created_at`, `like`) VALUES
(24, 20, 10, 'Truyện rất hay, hóng ra chương mới', '2025-09-10 19:36:16', 1);

-- --------------------------------------------------------

--
-- Table structure for table `StoryFavorites`
--

CREATE TABLE `StoryFavorites` (
  `favorite_id` int(11) NOT NULL,
  `story_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `StoryGenres`
--

CREATE TABLE `StoryGenres` (
  `story_id` int(11) DEFAULT NULL,
  `genre_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `StoryGifts`
--

CREATE TABLE `StoryGifts` (
  `gift_id` int(11) NOT NULL,
  `story_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `gift_type` varchar(255) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `StoryRatings`
--

CREATE TABLE `StoryRatings` (
  `rating_id` int(11) NOT NULL,
  `story_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `rating_value` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `StoryVotes`
--

CREATE TABLE `StoryVotes` (
  `vote_id` int(11) NOT NULL,
  `story_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `vote_type` enum('recommend','other') DEFAULT NULL,
  `amount` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `TopicCategory`
--

CREATE TABLE `TopicCategory` (
  `topic_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `TopicCategory`
--

INSERT INTO `TopicCategory` (`topic_id`, `title`) VALUES
(1, 'Trinh thám'),
(2, 'Ngôn tình'),
(3, 'Linh dị'),
(4, 'Lịch sử'),
(5, 'Thể loại khác'),
(6, 'Đề cử và Review truyện'),
(7, 'Nhập môn sáng tác'),
(8, 'Tìm bạn đồng sáng tác'),
(9, 'Tin tức và sự kiện'),
(10, 'Hỏi đáp cùng tác giả');

-- --------------------------------------------------------

--
-- Table structure for table `Transactions`
--

CREATE TABLE `Transactions` (
  `transaction_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `type` enum('deposit','spend','gift') DEFAULT NULL,
  `amount` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `provider` enum('local','google','facebook') DEFAULT 'local',
  `provider_uid` varchar(255) DEFAULT NULL,
  `role` enum('master_admin','content_admin','user') DEFAULT 'user',
  `coin_balance` int(11) DEFAULT 0,
  `link_thumbnail` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `gender` enum('male','female','other') DEFAULT 'other',
  `user_description` text DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`user_id`, `username`, `email`, `password_hash`, `provider`, `provider_uid`, `role`, `coin_balance`, `link_thumbnail`, `created_at`, `gender`, `user_description`, `phone_number`) VALUES
(1, 'minh', 'minh@example.com', '$2b$10$.w0PmBD7cLKdBdArdYkrKeN4o5bMskTm5de3.9ScYL9QamvY.LvTK', 'local', NULL, 'user', 0, 'https://cdn-icons-png.freepik.com/512/8428/8428718.png', '2025-08-25 14:40:57', 'other', NULL, NULL),
(2, 'Nguyễn Văn Tuấn', 'nguyenvantuan@example.com', '$2b$10$NAKGHui2Ik1QMCTH03iMAOdAxIF8/yzxxyE6yvPD3c/UY.QusBvaK', 'local', NULL, 'user', 0, 'https://cdn-icons-png.freepik.com/512/3607/3607444.png', '2025-08-25 14:40:57', 'other', NULL, NULL),
(3, 'Nguyễn Văn Tuấn', 'nguyenvantuan@gmail.com', '$2b$10$WZUkdvnbUCKXxguJxtHKte5BTATvs/gdLEEq/KyiTwHtUZocCOi0G', 'local', NULL, 'user', 0, 'https://cdn-icons-png.freepik.com/512/3607/3607444.png', '2025-08-25 14:44:50', 'other', NULL, NULL),
(4, 'Nguyễn Văn Tuấn', 'nguyenvantua12n@gmail.com', '$2b$10$5HP5XkiHSy43gsbRE3i78On7FcQBBxwsx5HD/fELtaATeGgz7oUFS', 'local', NULL, 'user', 0, 'https://cdn-icons-png.freepik.com/512/3607/3607444.png', '2025-08-25 17:52:24', 'other', NULL, NULL),
(5, 'minh', 'minh@gmail.com', '$2b$10$Joq2/frbxGMdayYzjRFOkuJjKvdbL.AqJvTtZd9LO8tesQgtpdujG', 'local', NULL, 'user', 0, 'https://cdn-icons-png.freepik.com/512/3607/3607444.png', '2025-08-25 17:54:36', 'other', NULL, NULL),
(6, 'minhtq', 'minhtq@gmail.com', '$2b$10$ZUgseN6NRHsbhmzvFezgeu1iyZt7QNinPJ9pPjZyQoKKqLR9/2hwy', 'local', NULL, 'user', 0, 'https://cdn-icons-png.freepik.com/512/3607/3607444.png', '2025-08-25 17:54:59', 'other', NULL, NULL),
(7, 'test', 'test@gmail.com', '$2b$10$nXc1yn.2mWRD5Y53Z7OAO.0/YPgnu9c7vwggAvYt9q1sWvx2jtouG', 'local', NULL, 'user', 0, 'https://cdn-icons-png.freepik.com/512/3607/3607444.png', '2025-08-25 17:55:52', 'other', NULL, NULL),
(8, 'minhtq', 'minhtq.dev12@gmail.com', '$2b$10$QEWYiKgOuinB6szkIXhyuO8StqPs39lYwaEdYnfucE05PMg61eGz6', 'local', NULL, 'user', 0, 'https://cdn-icons-png.freepik.com/512/3607/3607444.png', '2025-08-25 18:02:10', 'other', NULL, NULL),
(9, 'minhtq.dev', 'minhtq.dev123@gmail.com', '$2b$10$AxwDo.zgzBaBBoSunmQGfeYf2dsrEa1tdHc2EnhmhTlnk5jfvgqnq', 'local', NULL, 'user', 0, 'https://cdn-icons-png.freepik.com/512/3607/3607444.png', '2025-08-25 18:08:59', 'other', NULL, '0965727838'),
(10, 'minhtq', 'minhtq.dev@gmail.com', '$2b$10$gcdctgRzZCJ/vArbrIO2NOm0x7z/HXZzfyi2oJCXn3xrMCEFY22sy', 'local', NULL, 'user', 0, 'https://cdn-icons-png.freepik.com/512/3607/3607444.png', '2025-08-25 18:09:59', 'other', NULL, '0965727838'),
(11, 'minhtq1711', 'ab@gmail.com', '$2b$10$8bZtBOwuEu8wc.nrfE6nbuyP/7zfkzzhda.qC6GpdWAsvjkGHIPyq', 'local', NULL, 'user', 0, 'https://cdn-icons-png.freepik.com/512/3607/3607444.png', '2025-08-25 18:17:05', 'other', NULL, NULL),
(12, 'ababab', 'ababab@gmail.com', '$2b$10$6kRfJo6/XRdLcyzm4AcuJOSha6yNTZesBYoE0VyCJcOengsTopul6', 'local', NULL, 'user', 0, 'https://cdn-icons-png.freepik.com/512/3607/3607444.png', '2025-08-25 18:18:34', 'other', NULL, NULL),
(13, '123', '123@gmail.com', '$2b$10$MbWHJNPtednSPODBb.w8Y.4u.F/J8PSao8ajIhD8f1ej1duPkGUQO', 'local', NULL, 'user', 0, 'https://cdn-icons-png.freepik.com/512/3607/3607444.png', '2025-08-25 18:19:57', 'other', NULL, NULL),
(14, 'minh123', 'minh1@gmail.com', '$2b$10$KMmEXSKn18WduYJfw8lD1.32TDvfbDadPYPp89zFX3caszdtYDmQu', 'local', NULL, 'user', 0, 'https://cdn-icons-png.freepik.com/512/3607/3607444.png', '2025-08-25 18:21:12', 'other', NULL, NULL),
(15, '123', '123123@gmail.com', '$2b$10$x73Ihun.d000KEFQaGH9y.0z.TfKdiLuxo1KRXFfTxZd5bg/2vRky', 'local', NULL, 'user', 0, 'https://cdn-icons-png.freepik.com/512/3607/3607444.png', '2025-08-25 18:27:59', 'other', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `UserStories`
--

CREATE TABLE `UserStories` (
  `user_story_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `story_id` int(11) DEFAULT NULL,
  `status` enum('reading','favorite','authored') DEFAULT NULL,
  `last_chapter_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Chapters`
--
ALTER TABLE `Chapters`
  ADD PRIMARY KEY (`chapter_id`),
  ADD UNIQUE KEY `unique_story_chap` (`story_id`,`chap_number`);

--
-- Indexes for table `ForumComments`
--
ALTER TABLE `ForumComments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `ForumLikes`
--
ALTER TABLE `ForumLikes`
  ADD PRIMARY KEY (`like_id`),
  ADD KEY `fk_like_post` (`post_id`),
  ADD KEY `fk_like_user` (`user_id`);

--
-- Indexes for table `ForumPosts`
--
ALTER TABLE `ForumPosts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `story_id` (`story_id`),
  ADD KEY `genre_id` (`genre_id`);

--
-- Indexes for table `Genres`
--
ALTER TABLE `Genres`
  ADD PRIMARY KEY (`genre_id`);

--
-- Indexes for table `ReadLogs`
--
ALTER TABLE `ReadLogs`
  ADD PRIMARY KEY (`read_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `chapter_id` (`chapter_id`);

--
-- Indexes for table `Stories`
--
ALTER TABLE `Stories`
  ADD PRIMARY KEY (`story_id`),
  ADD KEY `author_id` (`author_id`);

--
-- Indexes for table `StoryComments`
--
ALTER TABLE `StoryComments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `story_id` (`story_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `StoryFavorites`
--
ALTER TABLE `StoryFavorites`
  ADD PRIMARY KEY (`favorite_id`),
  ADD KEY `story_id` (`story_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `StoryGenres`
--
ALTER TABLE `StoryGenres`
  ADD KEY `story_id` (`story_id`),
  ADD KEY `genre_id` (`genre_id`);

--
-- Indexes for table `StoryGifts`
--
ALTER TABLE `StoryGifts`
  ADD PRIMARY KEY (`gift_id`),
  ADD KEY `story_id` (`story_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `StoryRatings`
--
ALTER TABLE `StoryRatings`
  ADD PRIMARY KEY (`rating_id`),
  ADD KEY `story_id` (`story_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `StoryVotes`
--
ALTER TABLE `StoryVotes`
  ADD PRIMARY KEY (`vote_id`),
  ADD KEY `story_id` (`story_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `TopicCategory`
--
ALTER TABLE `TopicCategory`
  ADD PRIMARY KEY (`topic_id`);

--
-- Indexes for table `Transactions`
--
ALTER TABLE `Transactions`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `UserStories`
--
ALTER TABLE `UserStories`
  ADD PRIMARY KEY (`user_story_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `story_id` (`story_id`),
  ADD KEY `last_chapter_id` (`last_chapter_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Chapters`
--
ALTER TABLE `Chapters`
  MODIFY `chapter_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `ForumComments`
--
ALTER TABLE `ForumComments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ForumLikes`
--
ALTER TABLE `ForumLikes`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ForumPosts`
--
ALTER TABLE `ForumPosts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `Genres`
--
ALTER TABLE `Genres`
  MODIFY `genre_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `ReadLogs`
--
ALTER TABLE `ReadLogs`
  MODIFY `read_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Stories`
--
ALTER TABLE `Stories`
  MODIFY `story_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `StoryComments`
--
ALTER TABLE `StoryComments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `StoryFavorites`
--
ALTER TABLE `StoryFavorites`
  MODIFY `favorite_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `StoryGifts`
--
ALTER TABLE `StoryGifts`
  MODIFY `gift_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `StoryRatings`
--
ALTER TABLE `StoryRatings`
  MODIFY `rating_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `StoryVotes`
--
ALTER TABLE `StoryVotes`
  MODIFY `vote_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `TopicCategory`
--
ALTER TABLE `TopicCategory`
  MODIFY `topic_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `Transactions`
--
ALTER TABLE `Transactions`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `UserStories`
--
ALTER TABLE `UserStories`
  MODIFY `user_story_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Chapters`
--
ALTER TABLE `Chapters`
  ADD CONSTRAINT `chapters_ibfk_1` FOREIGN KEY (`story_id`) REFERENCES `Stories` (`story_id`);

--
-- Constraints for table `ForumComments`
--
ALTER TABLE `ForumComments`
  ADD CONSTRAINT `forumcomments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `ForumPosts` (`post_id`),
  ADD CONSTRAINT `forumcomments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

--
-- Constraints for table `ForumLikes`
--
ALTER TABLE `ForumLikes`
  ADD CONSTRAINT `fk_like_post` FOREIGN KEY (`post_id`) REFERENCES `ForumPosts` (`post_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_like_user` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `ForumPosts`
--
ALTER TABLE `ForumPosts`
  ADD CONSTRAINT `forumposts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`),
  ADD CONSTRAINT `forumposts_ibfk_2` FOREIGN KEY (`story_id`) REFERENCES `Stories` (`story_id`),
  ADD CONSTRAINT `forumposts_ibfk_3` FOREIGN KEY (`genre_id`) REFERENCES `Genres` (`genre_id`);

--
-- Constraints for table `ReadLogs`
--
ALTER TABLE `ReadLogs`
  ADD CONSTRAINT `readlogs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`),
  ADD CONSTRAINT `readlogs_ibfk_2` FOREIGN KEY (`chapter_id`) REFERENCES `Chapters` (`chapter_id`);

--
-- Constraints for table `Stories`
--
ALTER TABLE `Stories`
  ADD CONSTRAINT `stories_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `Users` (`user_id`);

--
-- Constraints for table `StoryComments`
--
ALTER TABLE `StoryComments`
  ADD CONSTRAINT `storycomments_ibfk_1` FOREIGN KEY (`story_id`) REFERENCES `Stories` (`story_id`),
  ADD CONSTRAINT `storycomments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

--
-- Constraints for table `StoryFavorites`
--
ALTER TABLE `StoryFavorites`
  ADD CONSTRAINT `storyfavorites_ibfk_1` FOREIGN KEY (`story_id`) REFERENCES `Stories` (`story_id`),
  ADD CONSTRAINT `storyfavorites_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

--
-- Constraints for table `StoryGenres`
--
ALTER TABLE `StoryGenres`
  ADD CONSTRAINT `storygenres_ibfk_1` FOREIGN KEY (`story_id`) REFERENCES `Stories` (`story_id`),
  ADD CONSTRAINT `storygenres_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `Genres` (`genre_id`);

--
-- Constraints for table `StoryGifts`
--
ALTER TABLE `StoryGifts`
  ADD CONSTRAINT `storygifts_ibfk_1` FOREIGN KEY (`story_id`) REFERENCES `Stories` (`story_id`),
  ADD CONSTRAINT `storygifts_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

--
-- Constraints for table `StoryRatings`
--
ALTER TABLE `StoryRatings`
  ADD CONSTRAINT `storyratings_ibfk_1` FOREIGN KEY (`story_id`) REFERENCES `Stories` (`story_id`),
  ADD CONSTRAINT `storyratings_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

--
-- Constraints for table `StoryVotes`
--
ALTER TABLE `StoryVotes`
  ADD CONSTRAINT `storyvotes_ibfk_1` FOREIGN KEY (`story_id`) REFERENCES `Stories` (`story_id`),
  ADD CONSTRAINT `storyvotes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

--
-- Constraints for table `Transactions`
--
ALTER TABLE `Transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

--
-- Constraints for table `UserStories`
--
ALTER TABLE `UserStories`
  ADD CONSTRAINT `userstories_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`),
  ADD CONSTRAINT `userstories_ibfk_2` FOREIGN KEY (`story_id`) REFERENCES `Stories` (`story_id`),
  ADD CONSTRAINT `userstories_ibfk_3` FOREIGN KEY (`last_chapter_id`) REFERENCES `Chapters` (`chapter_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
