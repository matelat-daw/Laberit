<?php
$title = "Providers - Delete User";
include 'includes/header.php';
include 'includes/modal-form.html';
?>
<script>form('Estas Seguro que Quieres Eliminar Este Usuario?', '<form action="deletit.php" method="post"><input type="hidden" name="id" value="<?php echo $_GET['id'];?>"><input type="submit" value="Eliminar" class="btn btn-danger">&nbsp;&nbsp;<input type="button" value="Cancelar" onclick="history.back();" class="btn btn-primary"></form>');</script>
<?php
include 'includes/footer.html';